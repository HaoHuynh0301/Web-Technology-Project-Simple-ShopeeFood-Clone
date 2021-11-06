from django.db import models
from django.contrib.auth.models import User


# Create your models here.
# Database table for category.
class Category(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name


# Database table for product.
class Product(models.Model):
    image = models.ImageField(upload_to="product-image/", blank=True)
    name = models.CharField(max_length=255)
    price = models.FloatField(default=0)
    note = models.TextField(blank=True)
    description = models.TextField(blank=True)
    category = models.ManyToManyField(Category)

    def __str__(self):
        return self.name


# Database table for customer
class Customer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True)
    full_name = models.CharField(max_length=255)
    phone_number = models.CharField(max_length=10)

    def __str__(self):
        return self.full_name


# Database table for order
class Order(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.SET_NULL, blank=True, null=True)
    date_ordered = models.DateTimeField(auto_now_add=True)
    is_checkout = models.BooleanField(default=False)
    is_delivered = models.BooleanField(default=False)
    lattitude = models.CharField(max_length=255, null=True, blank=True)
    longitude = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return str(self.id)

    @property
    def get_order_total(self):
        items = self.orderdetail_set.all()
        total = sum([item.get_order_detail_total for item in items])
        return total


# Database table for order detail
class OrderDetail(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=0)
    date_added = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.id)

    @property
    def get_order_detail_total(self):
        total = self.product.price * self.quantity
        return total


# Database table for shipping information.
class ShippingAddress(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.SET_NULL, null=True)
    order = models.ForeignKey(Order, on_delete=models.SET_NULL, null=True)
    province = models.CharField(max_length=255, null=False)
    district = models.CharField(max_length=255, null=False)
    ward = models.CharField(max_length=255, null=False)
    address = models.CharField(max_length=255, null=False)
    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.address
