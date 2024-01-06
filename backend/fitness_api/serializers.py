from rest_framework import serializers
from .models import PersonalWorkouts
from django.contrib.auth.models import User
from rest_framework.authtoken.models import Token



class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password')
        # Ensure password is write-only
        extra_kwargs = {'password': {'write_only': True, 'required': True}}
    # Ensuring password is hashed
    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        # Create token for user
        Token.objects.create(user=user)
        return user

class WorkOutSerializer(serializers.ModelSerializer):
    class Meta:
        model = PersonalWorkouts
        fields = '__all__'