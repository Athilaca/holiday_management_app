import React from 'react';
import { useLocation } from 'react-router-dom';

const HolidaysPage = () => {
  const location = useLocation();
  const { holidays } = location.state || { holidays: [] };

  return (
    <div>
      {/* Display holidays in a card format */}
      {holidays.map((holiday) => (
        <div key={holiday.id}>
       <h3>{holiday.name}</h3>
       <p>{holiday.description}</p>
        </div>
      ))}
    </div>
  );
};

export default HolidaysPage;
