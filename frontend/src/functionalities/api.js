
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

  try {
    const response = await axios.get(`http://127.0.0.1:8000/api/holidays/?country=${country}&year=${year}`);
    const holidays = response.data.response.holidays;
    if (!holidays || holidays.length === 0) {
      console.log("No holidays found");
      return []; 
    }
    return holidays;

  } catch (error) {
    console.error("Error fetching holidays:", error);
    return []; // Return an empty array in case of error
  }
};
