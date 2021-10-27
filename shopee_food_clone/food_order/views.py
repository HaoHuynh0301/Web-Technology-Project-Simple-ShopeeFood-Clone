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
            phone_number = form.cleaned_data["phone_number"]
            Customer.objects.create(user=user, phone_number=phone_number)
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
def order_detail(request):
    # Get customer information.
    customer = request.user.customer
    # Save customer to order.
    order, created = Order.objects.get_or_create(
        customer=customer, complete=False)
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


@api_view(['POST'])
def registerUserApi(request):
    serializer = CustomerCreationSerializer(data=request.data)
    if serializer.is_valid() and serializer.clean_password2():
        form = CustomerCreationForm(request.POST)
        if form.is_valid():
            user = form.save()
            phone_number = serializer.data['phone_number']
            Customer.objects.create(user=user, phone_number=phone_number)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def UpdatePasswordApi(request, format=None):
    try:
        new_password = request.data["password"]
        user = request.user
        user.set_password(new_password)
        user.save()
        return Response({"message": "Change password successfully!"}, status=status.HTTP_200_OK)
    except:
        return Response({"error": "Something went wrong!"}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def example_view(request, format=None):
    content = {
        'user': str(request.user),  # `django.contrib.auth.User` instance.
        'auth': str(request.auth),  # None
    }
    return Response(content)
