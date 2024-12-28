from django.urls import path
from .views import *

urlpatterns = [
    path('holidays/', HolidayAPIView.as_view(), name='holidays'),
    path('search-holidays/', SearchHolidayAPIView.as_view(), name='search_holidays'),
    path('countries/', CountryListAPIView.as_view(), name='country-list'),
    
]
