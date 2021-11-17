from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.conf import settings
from django.conf.urls.static import static

from . import views

urlpatterns = [
    path('', views.index, name="index"),
    path('register/', views.registerUser, name="register"),
    path('login/', views.loginUser, name="login"),
    path('logout/', views.logoutUser, name="logout"),
    path('cart/', views.cart, name="cart"),
    path('checkout/', views.checkout, name="checkout"),

    path('api/register/', views.registerUserApi, name="api_register"),
    path('api/login/', TokenObtainPairView.as_view(), name="api_login"),
    path('api/customer-infor/', views.CustomerView.as_view(), name = 'customer-information'),
    path('api/update-password/', views.updatePasswordApi, name="api_update_password"),
    path('api/get-all-products/', views.getAllProductsApi, name="api_get_all_products"),
    path('api/get-product/<int:pk>/', views.getProductApi, name="api_get_product"),
    path('api/product/', views.ProductView.as_view(), name = 'products-by-category'),
    path('api/add-product/', views.addProductsApi, name="api_add_product"),
    path('api/edit-product/<int:pk>', views.editProductsApi, name="api_edit_product"),
    path('api/add-to-cart/', views.addToCartApi, name="api_add_to_cart"),
    path('api/cart/', views.cartApi, name="api_cart"),
    path('api/checkout/', views.checkoutApi, name="api_checkout"),
    path('api/receive-order/<int:pk>/', views.confirmReceivedOrderApi, name="api_confirm_receive"),
    path('api/order-history/', views.getAllOrderApi, name="api_order_history"),
    path('api/middleware/', views.middleware, name="api_middleware"),
    path('api/update-coordinate/<int:pk>/', views.updateCoordinate, name="api_update_coordinate"),
    path('api/shipping-address/', views.InstanceAddressView.as_view(), name = 'shipping-address'),
    path('api/delivered-orders/', views.DeliveredOrderView.as_view(), name = 'delivered-orders'),
    path('api/re-order/', views.ReOrderView.as_view(), name = 're-order'),
    path('api/order/', views.OrderUpdateView.as_view(), name = 'order')
] + static(settings.MEDIA_URL, document_root = settings.MEDIA_ROOT)
