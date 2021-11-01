import json

from django.shortcuts import redirect, render
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.views import APIView

from .serializers import *
from .models import *
from .forms import *


# Create your views here.
# Function to render homepage and require user login.
@login_required(login_url="login")
def index(request):
    # Get total products from database.
    total_product = Product.objects.all()
    # Save form to context dictionary.
    context = {
        "total_product": total_product,
    }
    # Render to homepage.
    return render(request, "index.html", context)


# Register function.
def registerUser(request):
    # Initialize form for registration by UserCreationForm.
    form = CustomerCreationForm()
    # Check request method.
    if request.method == "POST":
        # Save post data to form.
        form = CustomerCreationForm(request.POST)
        # Save data to database if valid.
        if form.is_valid():
            user = form.save()
            # Save post phone number and user to customer.
            full_name = form.cleaned_data["full_name"]
            phone_number = form.cleaned_data["phone_number"]
            Customer.objects.create(
                user=user, full_name=full_name, phone_number=phone_number
            )
            # Notification for create account successfully.
            messages.success(request, "Create account successfully!")
            # Redirect to show messages.
            return redirect("register")

    # Save form to context dictionary.
    context = {
        "form": form,
    }
    # Render to register page.
    return render(request, "register.html", context)


# Login function.
def loginUser(request):
    # Check requset method.
    if request.method == "POST":
        # Get username and password from request.
        username = request.POST.get("username")
        password = request.POST.get("password")
        # Authenticate username and password.
        user = authenticate(request, password=password, username=username)
        # Login if user is exist.
        if user is not None:
            login(request, user)
            # Redirect to homepage.
            return redirect("index")
        # Notification for login error and redirect to login again.
        else:
            messages.info(request, "Invalid username or password!")
            return redirect("login")
    # Render login page.
    return render(request, "login.html")


# Logout function.
def logoutUser(request):
    # logout user and redirect to login page.
    logout(request)
    return redirect("login")


# Function to render cart data.
@login_required(login_url="login")
def cart(request):
    # Get customer information.
    customer = request.user.customer
    # Save customer to order.
    order, created = Order.objects.get_or_create(customer=customer, complete=False)
    # Save product to cart.
    items = order.orderdetail_set.all()

    # Save list of products in cart to context dictionary.
    context = {
        "items": items,
    }
    # Render to check cart page.
    return render(request, "order-detail.html", context)


# Function to checkout.
@login_required(login_url="login")
def checkout(request):
    return redirect("index")


# Functions for API.
# API function to register customer.
@api_view(["POST"])
def registerUserApi(request):
    # Serialize POST request.
    serializer = CustomerCreationSerializer(data=request.data)
    # Save customer to database if valid.
    if serializer.is_valid() and serializer.clean_password2():
        form = CustomerCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            full_name = form.cleaned_data["full_name"]
            phone_number = form.cleaned_data["phone_number"]
            Customer.objects.create(
                user=user, full_name=full_name, phone_number=phone_number
            )
        # Return JSON result.
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    # Return JSON errors.
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# API function to update password. Require login.
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def updatePasswordApi(request, format=None):
    try:
        new_password = request.data["password"]
        user = request.user
        user.set_password(new_password)
        user.save()
        return Response(
            {"message": "Change password successfully!"}, status=status.HTTP_200_OK
        )
    except:
        return Response(
            {"error": "Something went wrong!"}, status=status.HTTP_400_BAD_REQUEST
        )


# API function to get all products. Require login.
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getAllProductsApi(request):
    # Get all products.
    product = Product.objects.all()
    # Serialize data for the respone.
    productSerializer = ProductSerializer(product, many=True)
    # Return JSON result.
    return Response(productSerializer.data, status=status.HTTP_200_OK)


# API function to get a product by product id. Require login.
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getProductApi(request, pk):
    # Get product with given pk
    product = Product.objects.get(pk=pk)
    # Serialize data for the response.
    productSerializer = ProductSerializer(product, many=False)
    # Return JSON result.
    return Response(productSerializer.data, status=status.HTTP_200_OK)


# API function to add a product. Require login.
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def addProductsApi(request):
    # Get product with given pk
    productSerializer = ProductSerializer(data=request.data)
    # Save product to database if valid.
    if productSerializer.is_valid():
        productSerializer.save()
        # Return JSON result.
        return Response(productSerializer.data, status=status.HTTP_200_OK)
    # Return JSON error.
    else:
        return Response(productSerializer.errors, status=status.HTTP_400_BAD_REQUEST)


# API function to edit a product by product id. Require login.
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def editProductsApi(request, pk):
    # Get product with given pk
    product = Product.objects.get(pk=pk)
    # Serialize data for the response.
    productSerializer = ProductSerializer(instance=product, data=request.data)
    # Save product to database if valid.
    if productSerializer.is_valid():
        productSerializer.save()
        # Return JSON result.
        return Response(productSerializer.data, status=status.HTTP_200_OK)
    # Return JSON error.
    else:
        return Response(productSerializer.errors, status=status.HTTP_400_BAD_REQUEST)


# API function to get cart data of user. Require login.
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def cartApi(request):
    # Get customer information.
    customer = request.user.customer
    # Save customer to order.
    order, created = Order.objects.get_or_create(customer=customer, complete=False)
    # Save product to cart.
    items = order.orderdetail_set.all()
    # Serialize data for the respone.
    orderDetailSerializer = OrderDetailSerializer(items, many=True)
    # Return JSON result.
    return Response(orderDetailSerializer.data, status=status.HTTP_200_OK)


# API function to add product to cart. Require login.
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def addToCartApi(request):
    # JSON format: {"productId":1,"action":"add"}
    # Get JSON data from request.
    data = json.loads(request.body)
    productId = data["productId"]
    action = data["action"]

    # Get customer information
    customer = request.user.customer
    # Get product information.
    product = Product.objects.get(pk=productId)
    # Get or create new order.
    order, created = Order.objects.get_or_create(customer=customer, complete=False)
    orderItem, created = OrderDetail.objects.get_or_create(order=order, product=product)

    # Check button action.
    if action == "add":
        orderItem.quantity = orderItem.quantity + 1
    elif action == "remove":
        orderItem.quantity = orderItem.quantity - 1
    orderItem.save()
    # Delete product from cart if quantity 0.
    if orderItem.quantity <= 0:
        orderItem.delete()

    # Return JSON result.
    return Response({"message": "added"}, status=status.HTTP_200_OK)


# API function to checkout. Require login.
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def checkoutApi(request):
    # Get JSON data from request.
    data = json.loads(request.body)
    address = data["address"]
    # Get customer information
    customer = request.user.customer
    # Get order.
    order = Order.objects.get(customer=customer, complete=False)
    # Create new shipping.
    ShippingAddress.objects.create(customer=customer, order=order, address=address)
    # Return JSON result.
    return Response({"message": "Create order successfully!"}, status=status.HTTP_200_OK)


# API function to checkout. Require login.
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def completeOrderApi(request):
    # Get customer information
    customer = request.user.customer
    # Get order.
    order = Order.objects.get(customer=customer, complete=False)
    # Update complete status for order.
    order.complete = True
    order.save()
    # Return JSON result.
    return Response({"message": "Order completed!"}, status=status.HTTP_200_OK)
