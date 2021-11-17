import json

from django.shortcuts import redirect, render
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from rest_framework.views import APIView
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
    order, created = Order.objects.get_or_create(
        customer = customer, is_checkout = False)
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
        return Response({'msg':'Created'}, status=status.HTTP_201_CREATED)
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
            {"message": "Change password successfully!"}, 
            status=status.HTTP_200_OK
        )
    except:
        return Response(
            {"error": "Something went wrong!"}, 
            status=status.HTTP_400_BAD_REQUEST
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
    product = Product.objects.get(pk = pk)
    # Serialize data for the response.
    productSerializer = ProductSerializer(instance = product, data = request.data)
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
    customer = request.user
    instanceOrder = Order.objects.filter(customer = customer, is_delivered = False)
    if len(instanceOrder) > 0:
        orderDetails = instanceOrder[0].orderdetail_set.all()
        orderSerializer = OrderSerializer(instanceOrder[0])
        serializer = OrderDetailSerializer(orderDetails, many = True)
        print(orderDetails)
        context = {
            'order': orderSerializer.data,
            'items': serializer.data
        }
        return Response(context, status = status.HTTP_200_OK)
    return Response({'msg': 'NOT FOUND'}, status = status.HTTP_400_BAD_REQUEST)


# API function to add product to cart. Require login.
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def addToCartApi(request):
    # JSON format for add: {"productId":1,"action":"add"}
    # JSON format for remove: {"productId":1,"action":"remove"}
    # Get JSON data from request.
    data = request.data
    productId = data["product_id"]
    action = data["action"]

    # Get customer information
    customer = request.user
    # Get product information.
    product = Product.objects.get(pk = productId)
    # Get or create new order.
    order, created = Order.objects.get_or_create(
        customer = customer,
        is_checkout = False
    )
    orderItem, created = OrderDetail.objects.get_or_create(
        order = order, 
        product = product
    )

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
    data = request.data
    lattitude = data['lattitude']
    longitude = data['longitude']
    cast = data['cast']
    # Get customer information
    customer = request.user
    # Update checkout status for order.
    order = Order.objects.get(customer = customer, is_checkout = False)
    order.is_checkout = True
    order.lattitude = lattitude
    order.longitude = longitude
    order.cast = cast
    order.save()
    # Create new shipping.
    ShippingAddress.objects.create(
        customer = customer,
        order = order,
        longitude = '106.62965',
        lattitude = '10.82302'
    )
    orderSerializer = OrderSerializer(order)
    orderDetails = order.orderdetail_set.all()
    orderDetailsSerializer = OrderDetailSerializer(orderDetails, many = True)
    context = {
        'order': orderSerializer.data,
        'items': orderDetailsSerializer.data
    }
    # Return JSON result.
    return Response(context, status = status.HTTP_200_OK)


# API function to confirm received order of customer. Require login.
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def confirmReceivedOrderApi(request, pk):
    # Get customer information
    customer = request.user
    # Get order.
    order = Order.objects.get(pk = pk, customer = customer)
    # Update is_checkout status for order.
    order.is_delivered = True
    order.save()
    # Return JSON result.
    return Response({"message": "Order completed!"}, status=status.HTTP_200_OK)


# API function to get all order of customer. Require login.
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getAllOrderApi(request):
    # Get customer information
    customer = request.user
    # Get order.
    order = Order.objects.all().filter(customer = customer)
    # Serialize data for the respone.
    orderSerializer = OrderSerializer(order, many=True)
    # Return JSON result.
    return Response(orderSerializer.data, status=status.HTTP_200_OK)


# API function to middleware. Require login.
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def middleware(request):
    return Response(status=status.HTTP_200_OK)


# API function to update coordinate. Require login.
@api_view(["GET"])
@permission_classes([IsAuthenticated])
def updateCoordinate(request, pk):
    # Get upload data from request.
    lattitude = request.data["lattitude"]
    longtitude = request.data["longtitude"]
    # Get order from database.
    order = Order.objects.get(pk=pk)
    # Update lattitude and longtitude.
    order.lattitude = lattitude
    order.longitude = longtitude
    # Save order.
    order.save()
    # Return JSON result.
    return Response({"message": "Order completed!"}, status=status.HTTP_200_OK)


class ProductView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, format = None):
        categoryId = request.query_params.get('id')
        instanceCategory = Category.objects.filter(id = categoryId)
        if len(instanceCategory) > 0:
            products = instanceCategory[0].product_set.all()
            serializer = ProductSerializer(products, many = True)
            return Response(serializer.data, status = status.HTTP_200_OK)
        return Response({'msg': 'Not found'}, status = status.HTTP_400_BAD_REQUEST)
    
    
class CustomerView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, format = None):
        instanceUser = request.user
        serializer = CustomerSerializer(instanceUser)
        return Response(serializer.data, status = status.HTTP_200_OK)
    
    def post(self, request, format = None):
        password = request.data['password']
        instanceUser = request.user
        serializer = CustomerSerializer(instanceUser, data = request.data)
        if serializer.is_valid():
            serializer.save()
            instanceUser.set_password(password)
            instanceUser.save()
            return Response({'msg': 'Updated'}, status = status.HTTP_200_OK)
        return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)
    
    
class InstanceAddressView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, format = None):
        user = request.user
        orders = user.order_set.filter(is_delivered = False)
        print(orders[0])
        if len(orders) > 0:
            shippingAddress = orders[0].shippingaddress_set.all()
            if len(shippingAddress) > 0:
                serializer = ShippingAddressSerializer(shippingAddress[0])
                return Response(serializer.data, status = status.HTTP_200_OK)
        return Response({'msg': 'NOT FOUND'}, status = status.HTTP_400_BAD_REQUEST)
    
    
class DeliveredOrderView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, format = None):
        user = request.user
        deliveredOrder = user.order_set.filter(is_delivered = True)
        if len(deliveredOrder) > 0:
            serializer = OrderSerializer(deliveredOrder, many = True)
            return Response(serializer.data, status = status.HTTP_200_OK)
        return Response({'msg': 'ERROR'}, status = status.HTTP_400_BAD_REQUEST)
    
    
class ReOrderView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request, format = None):
        user = request.user
        instanceOrder = Order.objects.filter(customer = user, is_delivered = False)
        if len(instanceOrder) == 0:
            reOrderId = request.data['order_id']
            reOrder = Order.objects.filter(id = reOrderId)
            if len(reOrder) > 0:
                newOrder = Order.objects.create(
                    customer = user,
                    date_ordered = reOrder[0].date_ordered,
                    is_checkout = False,
                    is_delivered = False,
                    cast = 0.0,
                    lattitude = '',
                    longitude = ''
                )
                reOrderDetail = reOrder[0].orderdetail_set.all() 
                for orderDetail in reOrderDetail:
                    OrderDetail.objects.create(
                        product = orderDetail.product,
                        order = newOrder,
                        quantity = orderDetail.quantity,
                        date_added = orderDetail.date_added
                    )
                orderSerializer = OrderSerializer(newOrder)
                orderDetails = newOrder.orderdetail_set.all()  
                serializer = OrderDetailSerializer(orderDetails, many = True)    
                context = {
                    'order': orderSerializer.data,
                    'items': serializer.data
                }
            return Response(context, status = status.HTTP_200_OK)
        return Response({'msg': 'Error'}, status = status.HTTP_400_BAD_REQUEST)
    
    
class OrderUpdateView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request, format = None):
        orderDetailId = request.data['order_detail_id']
        statusTmp = request.data['status']
        customer = request.user
        instanceOrderDetail = OrderDetail.objects.filter(id = orderDetailId)
        if len(instanceOrderDetail) > 0:
            orderDetail = instanceOrderDetail[0]
            # 1 == "+"
            if statusTmp == 1:
                orderDetail.quantity = orderDetail.quantity + 1
                orderDetail.save()
            if statusTmp == 2:
                orderDetail.quantity = orderDetail.quantity - 1
                orderDetail.save()
                if orderDetail.quantity <= 0:
                    orderDetail.delete()
            instanceOrder = Order.objects.filter(customer = customer, is_delivered = False)
            if len(instanceOrder) > 0:
                orderDetails = instanceOrder[0].orderdetail_set.all()
                orderSerializer = OrderSerializer(instanceOrder[0])
                serializer = OrderDetailSerializer(orderDetails, many = True)
                print(orderDetails)
                context = {
                    'order': orderSerializer.data,
                    'items': serializer.data
                }
                return Response(context, status = status.HTTP_200_OK)
            return Response({'msg': 'NOT FOUND'}, status = status.HTTP_400_BAD_REQUEST)
        return Response({'msg': 'not found'}, status = status.HTTP_400_BAD_REQUEST)