from django.shortcuts import render

from rest_framework import viewsets
from .models import Category, Allocation
from .serializers import CategorySerializer, AllocationSerializer

# Create your views here.

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class AllocationViewSet(viewsets.ModelViewSet):
    queryset = Allocation.objects.all()
    serializer_class = AllocationSerializer
