from django.contrib import admin
from django.urls import include, path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from api.views import CreateUserView

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/user/register/", CreateUserView.as_view(), name="register_user"),
    # Once a new user has been created, we can leverage pre-built JWT-specific DRF views to effectively obtain token data for that user & sign in
    path("api/token/", TokenObtainPairView.as_view(), name="get_token"),
    path(
        "api/token/refresh/", TokenRefreshView.as_view(), name="refresh_token"
    ),
    # Includes all necessary additional pre-built DRF views for handling user auth
    path("api-auth/", include("rest_framework.urls")),
    # URL forwarding syntax
    path("api/", include("api.urls")),
]
