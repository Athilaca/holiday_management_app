from django.urls import path
from .views import *

urlpatterns = [
    path('holidays/', Holiday.as_view(), name='holidays'),
    path('search-holidays/', SearchHoliday.as_view(), name='search_holidays'),
    path('countries/', CountryList.as_view(), name='country-list'),
    
]
