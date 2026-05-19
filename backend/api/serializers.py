from django.contrib.auth.models import User
from .models import Note
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        # Built-in Django model
        model = User
        # All the fields we want to serialise when accepting AND returning a new user
        fields = ["id", "username", "password"]
        # Tells Django not to return user PWs with rest of new user data (i.e. PWs will only be accepted - not returned... "We can set but not see")
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["id", "title", "body", "created_at", "author"]
        # Ensures we cannot "assign" a note to any user other than the one currently authenticated (i.e. "We can see but not set")
        extra_kwargs = {"author": {"read_only": True}}
