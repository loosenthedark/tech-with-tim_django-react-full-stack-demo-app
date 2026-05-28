# Stage 1: Build React app
FROM node:20-alpine AS build

# Set working dir inside container
WORKDIR /app

# Copy contents of package.json & package-lock.json into container
COPY package*.json ./

# Install project dependencies
# This command reads package.json & installs all necessary node.js packages
RUN npm install

# Copy rest of application code into container
COPY . .

# Build React app for production
RUN npm run build

# Stage 2: Serve React app with Nginx
FROM nginx:alpine

# Copy contents of custon Nginx config file
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy all built React static files from Stage 1 into Nginx's default
# public web serving dir
COPY --from=build /app/dist/ /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Command to run Nginx when container starts
CMD [ "nginx", "-g", "daemon off"; ]