from django.contrib.auth.models import User
from rest_framework import serializers


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        # Built-in Django model
        model = User
        # All the fields we want to serialise when accepting AND returning a new user
        fields = ["id", "username", "password"]
        # Tells Django not to return user PWs with rest of new user data (i.e. PWs will only be accepted - not returned)
        extra_kwargs = {"password": {"write-only": True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user
