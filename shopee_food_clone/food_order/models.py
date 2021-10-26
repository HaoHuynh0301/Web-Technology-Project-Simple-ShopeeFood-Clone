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
    stock_number = models.IntegerField(default=0)
    category = models.ManyToManyField(Category)

    def __str__(self):
        return self.name


# Database table for customer
class Customer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, null=True, blank=True)
    phone_number = models.CharField(max_length=10)

    def __str__(self):
        return self.user.username


# Database table for order
class Order(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.SET_NULL, blank=True, null=True)
    date_ordered = models.DateTimeField(auto_now_add=True)
    complete = models.BooleanField(default=False)

    def __str__(self):
        return str(self.id)


# Database table for order detail
class OrderDetail(models.Model):
    product = models.ForeignKey(Product, on_delete=models.CASCADE, null=True)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=0)
    date_added = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.id)
