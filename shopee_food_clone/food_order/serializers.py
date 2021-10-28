from django.db.models import fields
from rest_framework.response import Response
from rest_framework import serializers

from .models import *


class CustomerCreationSerializer(serializers.ModelSerializer):
    username = serializers.CharField()
    email = serializers.EmailField()
    password1 = serializers.CharField()
    password2 = serializers.CharField()
    phone_number = serializers.CharField()

    class Meta:
        model = Customer
        fields = ["username", "email", "password1", "password2", "phone_number"]

    def clean_password2(self):
        # Check that the two password entries match
        password1 = self.data["password1"]
        password2 = self.data["password2"]
        if password1 and password2 and password1 != password2:
            return False
        return True


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"
