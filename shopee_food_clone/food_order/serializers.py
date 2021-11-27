from django.db.models import fields
from rest_framework.response import Response
from rest_framework import serializers

from .models import *


# Serializer for register customer.
class CustomerCreationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = [
            "full_name",
            "full_name",
            "email",
            "password",
            "phone_number",
        ]



class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = [
            "full_name",
            "email",
            "password",
            "phone_number",
            "avatar"
        ]
        

# Serializer for get product.
class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = "__all__"


# Serializer for get cart product.
class OrderDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderDetail
        fields =  [
            "id",
            "product",
            "order",
            "quantity",
            "date_added",
            "get_order_detail_total",
            "name_of_product"
        ]


# Serializer for get all order of customer.
class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = "__all__"


class ShippingAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShippingAddress
        fields = "__all__"
        

class VoucherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Voucher
        fields = "__all__"
        

class CustomerVoucherSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomerVoucher
        fields = "__all__"