from django.shortcuts import render

from rest_framework import viewsets
from .models import Category, Allocation
from .serializers import CategorySerializer, AllocationSerializer

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.db.models import Sum

# Create your views here.

class BudgetCalculationView(APIView):
    def post(self, request):
        biweekly_income = request.data.get('biweekly_income')
        period = request.data.get('period')
        
        if not biweekly_income or not period:
            return Response({'error': 'biweekly_income and period are required'}, status=status.HTTP_400_BAD_REQUEST)

        total_income = biweekly_income * 2 if period == 'monthly' else biweekly_income * 26
        
        categories = Category.objects.all()
        total_percentage = categories.filter(allocation_type='percentage').aggregate(Sum('value'))['value__sum'] or 0
        fixed_total = categories.filter(allocation_type='fixed').aggregate(Sum('value'))['value__sum'] or 0
        
        if total_percentage > 100:
            return Response({'error': 'Total percentage exceeds 100%'}, status=status.HTTP_400_BAD_REQUEST)

        allocations = {}
        remaining_balance = total_income - fixed_total - (total_percentage / 100 * total_income)
        for category in categories:
            if category.allocation_type == 'percentage':
                allocations[category.name] = (category.value / 100) * total_income
            else:
                allocations[category.name] = category.value

        allocations['Remaining Balance'] = remaining_balance
        
        return Response(allocations, status=status.HTTP_200_OK)

class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer

class AllocationViewSet(viewsets.ModelViewSet):
    queryset = Allocation.objects.all()
    serializer_class = AllocationSerializer

class ClearCategoriesView(APIView):
    def delete(self, request):
        Category.objects.all().delete()
        return Response({'message': 'All categories cleared'}, status=status.HTTP_204_NO_CONTENT)
