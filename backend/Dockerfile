# Stage 1: Build Python dependencies
FROM python:3.12-slim AS build

# Set env vars for Python
ENV PYTHONUNBUFFERED=1
ENV PYTHONDONTWRITEBYTECODE=1

# Set working dir inside the container for this stage
WORKDIR /app

# Install system dependencies required for mysqlclient & other build tools
RUN apt-get update && \
    apt-get install -y --no-install-recommends \
    build-essential \
    pkg-config \
    libmariadb-dev && \
    rm -rf /var/lib/apt/lists/*

# Copy contents of requirements file into container
COPY requirements.txt .

# Install Python dependencies listed in requirements file
RUN pip install --no-cache-dir --upgrade pip &&\
    pip install --no-cache-dir -r requirements.txt

# Stage 2: Create final image - this stage creates the final (smaller) prod image, and will only include the necessary runtime components (i.e. not the build tools from previous stage)
FROM python:3.12-slim

# Set working dir for final image
WORKDIR /app

# Copy installed Python deps from build stage to final image
COPY --from=build /usr/local/lib/python3.12/site-packages /usr/local/lib/python3.12/site-packages
COPY --from=build /usr/local/bin /usr/local/bin

# Copy Django project into container
COPY . .

# Expose port 8000 (where gunicorn server will run) to listen for connections
EXPOSE 8000

# Command to run Django app using gunicorn
CMD [ "gunicorn", "backend.wsgi:application", "--bind", "0.0.0.0:8000", "--timeout", "300", "--workers", "3" ]