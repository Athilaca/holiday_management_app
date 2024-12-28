import requests
from django.core.cache import cache
from django.conf import settings
from rest_framework.response import Response # type: ignore
from rest_framework.views import APIView # type: ignore
from rest_framework import status # type: ignore

class HolidayAPIView(APIView):
    def get(self, request, *args, **kwargs):
        country = request.query_params.get('country')
        year = request.query_params.get('year')

        if not country or not year:
            return Response({"error": "Country and Year are required."}, status=status.HTTP_400_BAD_REQUEST)

        # Check the cache for the data
        cache_key = f"holidays_{country}_{year}"
        cached_data = cache.get(cache_key)

        if cached_data:
            return Response(cached_data, status=status.HTTP_200_OK)

        # Fetch data from the Calendarific API
        url = "https://calendarific.com/api/v2/holidays"
        params = {
            "api_key": settings.CALENDARIFIC_API_KEY,
            "country": country,
            "year": year,
        }

        response = requests.get(url, params=params)

        if response.status_code == 200:
            data = response.json()
            cache.set(cache_key, data,  timeout=3600)  # Cache for 24 hours
            return Response(data, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Failed to fetch holidays."}, status=response.status_code)

class SearchHolidayAPIView(APIView):
    def get(self, request, *args, **kwargs):
        name = request.query_params.get('name')
        country = request.query_params.get('country')
        year = request.query_params.get('year')

        if not name or not country or not year:
            return Response({"error": "Name, Country, and Year are required."}, status=status.HTTP_400_BAD_REQUEST)

        cache_key = f"holidays_{country}_{year}"
        cached_data = cache.get(cache_key)

        if not cached_data:
            return Response({"error": "No holiday data available. Fetch holidays first."}, status=status.HTTP_404_NOT_FOUND)

        holidays = cached_data.get('response', {}).get('holidays', [])
        filtered_holidays = [holiday for holiday in holidays if name.lower() in holiday['name'].lower()]

        return Response(filtered_holidays, status=status.HTTP_200_OK)

class CountryListAPIView(APIView):
    def get(self, request, *args, **kwargs):


        url = "https://calendarific.com/api/v2/countries"
        params = {
            "api_key": settings.CALENDARIFIC_API_KEY,
            
        }

        response = requests.get(url, params=params)

        if response.status_code == 200:
            data = response.json()
            
            return Response(data, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Failed to fetch holidays."}, status=response.status_code)
        
