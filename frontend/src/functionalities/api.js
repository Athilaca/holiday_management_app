import { setCache, getCache } from '../utils/cache';

import axios from 'axios';

export const getCountries = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:8000/api/countries/'); // Replace with your actual API endpoint
    const countriesData = response.data.response.countries;
    return countriesData;
  } catch (error) {
    console.error("Error fetching countries:", error);
    return []; // Return an empty array in case of error
  }
};



export const getHolidays = async (country, year) => {

  const cacheKey = `holidays_${country}_${year}`;
  const cachedHolidays = getCache(cacheKey);

  if (cachedHolidays) {
      console.log("Returning cached data");
      return cachedHolidays; // Return from cache
  }
  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/holidays/?country=${country}&year=${year}`);
    const holidays = response.data.response.holidays;
    setCache(cacheKey, holidays); // Save in cache
    return holidays;
    
  } catch (error) {
    console.error("Error fetching holidays:", error);
    return []; // Return an empty array in case of error
  }
};
