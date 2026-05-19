from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated, AllowAny

from .serializers import UserSerializer


# Make a class-based view (i.e. registration form) that enables us to create new users
class CreateUserView(generics.CreateAPIView):
    # Specifies all of the different objects we're gonna be looking at when creating a new one
    # Among other things, this ensures we don't/can't create a user that already exists in the DB
    queryset = User.objects.all()
    # Tells the view what kind of data we need to accept in order to create a new user
    serializer_class = UserSerializer
    # Specifies who can actually call this view (i.e. no auth required here)
    permission_classes = [AllowAny]
