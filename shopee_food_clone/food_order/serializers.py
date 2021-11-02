from django.db.models import fields
from rest_framework.response import Response
from rest_framework import serializers

from .models import *


# Serializer for register customer.
class CustomerCreationSerializer(serializers.ModelSerializer):
    full_name = serializers.CharField()
    username = serializers.CharField()
    email = serializers.EmailField()
    password1 = serializers.CharField()
    password2 = serializers.CharField()
    phone_number = serializers.CharField()

    class Meta:
        model = Customer
        fields = [
            "full_name",
            "username",
            "email",
            "password1",
            "password2",
            "phone_number",
        ]

    def clean_password2(self):
        # Check that the two password entries match
        password1 = self.data["password1"]
        password2 = self.data["password2"]
        if password1 and password2 and password1 != password2:
            return False
        return True


# Serializer for get product.
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"


# Serializer for get cart product.
class OrderDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderDetail
        fields = [
            "id",
            "product",
            "order",
            "quantity",
            "date_added",
            "get_order_detail_total",
        ]


# Serializer for get all order of customer.
class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = "__all__"
