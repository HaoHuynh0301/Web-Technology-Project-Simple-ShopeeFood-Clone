from django.db import models
from django.utils import timezone
from django.conf import settings
from django.contrib.auth.models import User
from django.contrib.auth.models import (
    BaseUserManager, AbstractBaseUser, PermissionsMixin
)

class MyUserManager(BaseUserManager):
    def create_user(self, 
                    email, 
                    full_name, 
                    phone_number, 
                    password = None):
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(
            email = self.normalize_email(email),
            full_name = full_name,
            phone_number = phone_number,
        )

        user.set_password(password)
        user.save()
        return user
    
    def create_superuser(self, 
                        email, 
                        full_name, 
                        phone_number, 
                        password = None):
        user = self.create_user(
            email = email,
            full_name = full_name,
            phone_number = phone_number,
            password = password
        )
        user.is_admin = True
        user.is_superuser = True
        user.save()
        return user

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
    
    @property
    def name_of_product(self):
        return str(self.name)


# Database table for customer
class Customer(AbstractBaseUser):
    email = models.EmailField(
        verbose_name = 'email address',
        max_length = 255,
        unique = True,
    )
    full_name = models.CharField(max_length = 255, blank = True)
    phone_number = models.CharField(max_length=10)
    is_active = models.BooleanField(default = True)
    is_admin = models.BooleanField(default = False)
    is_superuser = models.BooleanField(default = False)
    
    objects = MyUserManager()
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = [
                        'full_name', 
                        'phone_number', 
                        ]

    def __str__(self):
        return self.full_name
    
    @property
    def is_staff(self):
        "Is the user a member of staff?"
        return self.is_admin
    
    def has_perm(self, perm, obj = None):
        return True

    def has_module_perms(self, app_label):
        return True   


# Database table for order
class Order(models.Model):
    customer = models.ForeignKey(Customer, on_delete = models.CASCADE, blank=True, null=True)
    date_ordered = models.DateTimeField(auto_now_add=True)
    is_checkout = models.BooleanField(default=False)
    is_delivered = models.BooleanField(default=False)
    cast = models.FloatField(default=0)
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
    product = models.ForeignKey(Product, on_delete = models.CASCADE, null=True)
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    quantity = models.IntegerField(default=0)
    date_added = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.id)

    @property
    def get_order_detail_total(self):
        total = self.product.price * self.quantity
        return total
    
    @property
    def name_of_product(self):
        return str(self.product.name)


# Database table for shipping information.
class ShippingAddress(models.Model):
    customer = models.ForeignKey(Customer, on_delete = models.SET_NULL, null=True)
    order = models.ForeignKey(Order, on_delete = models.SET_NULL, null=True)
    lattitude = models.CharField(max_length=255, null=True, blank=True)
    longitude = models.CharField(max_length=255, null=True, blank=True)
    date_created = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return str(self.id)
