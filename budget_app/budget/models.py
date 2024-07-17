from django.db import models

# Create your models here.

class Category(models.Model):
    name = models.CharField(max_length=100)
    allocation_type = models.CharField(max_length=10, choices=[('percentage', 'Percentage'), ('fixed', 'Fixed')])
    value = models.FloatField()

class Allocation(models.Model):
    biweekly_income = models.FloatField()
    period = models.CharField(max_length=10, choices=[('monthly', 'Monthly'), ('annual', 'Annual')])
    remaining_balance = models.FloatField()
    categories = models.ManyToManyField(Category, related_name='allocations')

