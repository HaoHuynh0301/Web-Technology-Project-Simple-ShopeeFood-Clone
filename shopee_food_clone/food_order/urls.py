"""shopee_food_clone URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

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
    path('api/update-password/', views.updatePasswordApi, name="api_update_password"),
    path('api/get-all-products/', views.getAllProductsApi, name="api_get_all_products"),
    path('api/get-product/<int:pk>/', views.getProductApi, name="api_get_product"),
    path('api/add-product/', views.addProductsApi, name="api_add_product"),
    path('api/edit-product/<int:pk>', views.editProductsApi, name="api_edit_product"),
    path('api/add-to-cart/', views.addToCartApi, name="api_add_to_cart"),
    path('api/cart/', views.cartApi, name="api_cart"),
]
