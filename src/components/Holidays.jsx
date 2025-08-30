// src/components/Holidays.jsx
import React, { useEffect, useState } from "react";
import { fetchHolidays } from "../api/api";
import "./Holidays.css";
const Holidays = () => {
  const [holidays, setHolidays] = useState([]);

  useEffect(() => {
    const loadHolidays = async () => {
      const data = await fetchHolidays();
      setHolidays(data);
    };
    loadHolidays();
  }, []);

  return (
    <div className="container">
      <h2>Holidays</h2>
      <ul>
        {holidays.map((holiday, index) => (
          <li key={index}>
            <strong>{holiday.holiday_date}</strong>: {holiday.holiday_description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Holidays;
