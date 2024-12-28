import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCountries, getHolidays } from '../functionalities/api/'; // Import the API call

const HomePage = () => {
  const [countries, setCountries] = useState([]); // Initialize with an empty array
  const currentYear = new Date().getFullYear();
  const allYears = Array.from(
    { length: (currentYear + 20) - 1900 + 1 },
    (_, index) => 1900 + index
  );

  // Set the years in state
  const [years, setYears] = useState(allYears);

  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [countryError, setCountryError] = useState(''); // Error for country
  const [yearError, setYearError] = useState(''); // Error for year

  const navigate = useNavigate();

  // Fetch countries when the component mounts
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const countriesList = await getCountries(); 
        setCountries(countriesList); 
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };
    
    fetchCountries();
  }, []);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    let hasError = false;

    // Reset previous error messages
    setCountryError('');
    setYearError('');

    // Check for country selection
    if (!selectedCountry) {
      setCountryError("Please select a country.");
      hasError = true;
    }

    // Check for year selection
    if (!selectedYear) {
      setYearError("Please select a year.");
      hasError = true;
    }

    if (hasError) return; // Stop the form submission if there is an error

    try {
      const holidays = await getHolidays(selectedCountry, selectedYear);
      navigate('/holidays', { state: { holidays } });
    } catch (error) {
      console.error("Error fetching holidays:", error);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-lg p-8">
        <h1 className="text-center text-5xl font-extrabold mt-2 text-gray-900 dark:text-white tracking-wider">
          Welcome to Holiday Viewer
        </h1>
        <p className="text-center text-sm text-gray-700 dark:text-gray-300 mt-6">
          Easily view public holidays across the world for any given year. Just click below to start exploring.
        </p>
      </div>

      <div className="w-full max-w-lg p-8">
        {/* Country Dropdown */}
        <div className="mt-6">
          <select
            id="country"
            value={selectedCountry}
            onChange={e => setSelectedCountry(e.target.value)}
            className="w-full p-4 border-2 border-gray-400 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:text-white bg-gradient-to-r from-black to-white shadow-lg text-lg"
          >
            <option value="" disabled>Select a Country</option>
            {countries.length > 0 ? (
              countries.map(country => (
                <option key={country['iso-3166']} value={country['iso-3166']}>
                {country.flag_unicode}  {country.country_name}  
                </option>
              ))
            ) : (
              <option value="">Loading countries...</option>
            )}
          </select>
        </div>
        {countryError && <p className="text-red-500 text-sm mt-2">{countryError}</p>}
        {/* Year Dropdown */}
        <div className="mt-6">
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
        {yearError && <p className="text-red-500 text-sm mt-2">{yearError}</p>}

        {/* Submit Button */}
        <div className="flex justify-center mt-6">
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







