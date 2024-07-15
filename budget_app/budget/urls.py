from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CategoryViewSet, AllocationViewSet, BudgetCalculationView, ClearCategoriesView

router = DefaultRouter()
router.register(r'categories', CategoryViewSet)
router.register(r'allocations', AllocationViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('calculate-budget/', BudgetCalculationView.as_view(), name='calculate-budget'),
    path('clear-categories/', ClearCategoriesView.as_view(), name='clear-categories'),
]
