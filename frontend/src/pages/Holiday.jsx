import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const HolidaysPage = () => {
  const location = useLocation();
  const { holidays } = location.state || { holidays: [] };

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(null); // State for selected date
  const [selectedHoliday, setSelectedHoliday] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedType, setSelectedType] = useState(''); // State for selected holiday type
  const holidaysPerPage = 15;

  // Get unique holiday types for the dropdown
  const holidayTypes = [
    ...new Set(holidays.flatMap(holiday => holiday.type)),
  ];

  // Filter holidays based on search term, selected date, and selected type
  const filteredHolidays = holidays.filter((holiday) => {
    const matchesSearch = holiday.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesDate = selectedDate
      ? new Date(holiday.date.iso).toDateString() === selectedDate.toDateString()
      : true;
    const matchesType = selectedType
      ? holiday.type.includes(selectedType)
      : true;

    return matchesSearch && matchesDate && matchesType;
  });

  const totalPages = Math.ceil(filteredHolidays.length / holidaysPerPage);
  const currentHolidays = filteredHolidays.slice(
    (currentPage - 1) * holidaysPerPage,
    currentPage * holidaysPerPage
  );

  const closeModal = () => setSelectedHoliday(null);

  return (
    <div className="flex flex-col mx-4 mt-20">
      {/* Search, Date Picker, and Type Dropdown Section */}
      <div className="p-4 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-4">
        {/* Search Bar */}
        <div className="relative w-full sm:w-2/3 md:w-1/2">
          <input
            type="text"
            placeholder="Search Holidays..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full px-10 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-gray-100 text-gray-800"
          />
          <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
        </div>

        {/* Date Picker */}
        <div className="relative w-full sm:w-auto">
          <DatePicker
            selected={selectedDate}
            onChange={(date) => {
              setSelectedDate(date);
              setCurrentPage(1);
            }}
            placeholderText="Select Date"
            className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-gray-100 text-gray-800"
          />
        </div>

        {/* Holiday Type Dropdown */}
        <div className="relative w-full sm:w-auto">
          <select
            value={selectedType}
            onChange={(e) => {
              setSelectedType(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 text-sm bg-gray-100 text-gray-800"
          >
            <option value="">Select Type</option>
            {holidayTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Holidays List */}
      <div className="flex">
        <div className="w-full p-2 sm:p-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {currentHolidays.map((holiday) => (
              <div
                key={holiday.id}
                className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105 cursor-pointer mx-2 sm:mx-4 my-2"
                onClick={() => setSelectedHoliday(holiday)}
              >
                <div className="p-4">
                  <h3 className="text-base sm:text-lg font-semibold text-gray-800">
                    {holiday.name}
                  </h3>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center mt-4 space-x-2">
              {Array.from({ length: totalPages }, (_, index) => (
                <button
                  key={index + 1}
                  onClick={() => setCurrentPage(index + 1)}
                  className={`px-3 py-1 text-sm rounded-md ${
                    currentPage === index + 1
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-300 text-gray-700 hover:bg-gray-400'
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal for holiday details */}
      {selectedHoliday && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-lg p-6 w-full sm:w-3/4 max-w-2xl">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4">{selectedHoliday.name}</h2>
            <p className="text-base sm:text-lg mb-4">{selectedHoliday.description}</p>
            <p className="text-gray-600 mb-2">
              <strong>Country:</strong> {selectedHoliday.country.name}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Type:</strong> {selectedHoliday.type.join(', ')}
            </p>
            <p className="text-gray-600 mb-2">
              <strong>Primary Type:</strong> {selectedHoliday.primary_type}
            </p>
            <p className="text-gray-600 mb-4">
              <strong>Date:</strong> {selectedHoliday.date.iso}
            </p>
            <button
              onClick={closeModal}
              className="px-4 py-2 bg-red-500 text-white-700 rounded-md hover:bg-red-500 hover: font-bold transition-all duration-200 ease-in-out"
            >
              Close
            </button>

          </div>
        </div>
      )}
    </div>
  );
};

export default HolidaysPage;









