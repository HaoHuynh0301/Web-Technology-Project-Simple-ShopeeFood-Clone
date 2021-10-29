from django.contrib import admin

from .models import *


# display individual fields of category on admin page.
class CategoryAdmin(admin.ModelAdmin):
    list_display = ["id", "name"]


# display individual fields of product on admin page.
class ProductAdmin(admin.ModelAdmin):
    list_display = ["id", "name", "price", "description"]


# display individual fields of customer on admin page.
class CustomerAdmin(admin.ModelAdmin):
    list_display = ["id", "user", "full_name", "phone_number"]


# display individual fields of order on admin page.
class OrderAdmin(admin.ModelAdmin):
    list_display = ["id", "customer", "date_ordered", "complete", "get_order_total"]


# display individual fields of order detail on admin page.
class OrderDetailAdmin(admin.ModelAdmin):
    list_display = ["id", "product", "order", "quantity", "date_added", "get_order_detail_total"]


# display individual fields of shipping address on admin page.
class ShippingAdressAdmin(admin.ModelAdmin):
    list_display = ["id", "customer", "order", "address", "date_created"]


# Register your models here.
admin.site.register(Category, CategoryAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(Customer, CustomerAdmin)
admin.site.register(Order, OrderAdmin)
admin.site.register(OrderDetail, OrderDetailAdmin)
admin.site.register(ShippingAddress, ShippingAdressAdmin)
