import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCountries,getHolidays } from '../functionalities/api/'; // Import the API call

const HomePage = () => {
  const [countries, setCountries] = useState([]); // Initialize with an empty array
  const [years, setYears] = useState([2024, 2025, 2026]); // Example years
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const navigate=useNavigate()

  // Fetch countries when the component mounts
  useEffect(() => {
    const fetchCountries = async () => {
      const countriesList = await getCountries(); // Fetch the countries from the API
      setCountries(countriesList); // Update the state with the fetched data
    };
    
    fetchCountries(); // Call the fetch function
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const holidays = await getHolidays(selectedCountry, selectedYear);
    console.log(holidays)
    navigate('/holidays', { state: { holidays } });
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-lg p-8">
        {/* Heading with shadow and font style */}
        <h1 className="text-center text-4xl font-bold mb-6 text-gray-900 dark:text-white shadow-lg tracking-wider">
          Holiday Viewer
        </h1>

        {/* Country Dropdown */}
        <div className="mb-6">
          <select
            id="country"
            value={selectedCountry}
            onChange={e => setSelectedCountry(e.target.value)}
            className="w-full p-4 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white bg-gradient-to-r from-black to-white shadow-lg text-lg"
          >
            <option value="" disabled>Select a Country</option>
            {countries.map(country => (
              <option key={country['iso-3166']} value={country['iso-3166']}>
                {country.country_name}
              </option>
            ))}
          </select>
        </div>

        {/* Year Dropdown */}
        <div className="mb-6">
          <select
            id="year"
            value={selectedYear}
            onChange={e => setSelectedYear(e.target.value)}
            className="w-full p-4 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white bg-gradient-to-r from-black to-white shadow-lg text-lg"
          >
            <option value="" disabled>Select a Year</option>
            {years.map(year => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            onClick={handleSubmit}
            className="w-full py-4 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 text-lg"
          >
            Let's Check?
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;






