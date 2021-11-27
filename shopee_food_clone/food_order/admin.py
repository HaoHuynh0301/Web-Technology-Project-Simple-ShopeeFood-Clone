from django.contrib import admin

from .models import *


# display individual fields of category on admin page.
class CategoryAdmin(admin.ModelAdmin):
    list_display = ["id", "name"]


# display individual fields of product on admin page.
class ProductAdmin(admin.ModelAdmin):
    list_display = ["id", "name", "price", "description"]


admin.site.register(Customer)


# display individual fields of order on admin page.
class OrderAdmin(admin.ModelAdmin):
    list_display = ["id", "customer", "date_ordered", "is_checkout", "is_delivered", "get_order_total"]


# display individual fields of order detail on admin page.
class OrderDetailAdmin(admin.ModelAdmin):
    list_display = ["id", "product", "order", "quantity", "date_added", "get_order_detail_total"]


# display individual fields of shipping address on admin page.
class ShippingAdressAdmin(admin.ModelAdmin):
    list_display = ["id", "customer", "order", "lattitude", "longitude", "date_created"]


# Register your models here.
admin.site.register(Category, CategoryAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(Order, OrderAdmin)
admin.site.register(OrderDetail, OrderDetailAdmin)
admin.site.register(ShippingAddress, ShippingAdressAdmin)
admin.site.register(Voucher)
admin.site.register(CustomerVoucher)
