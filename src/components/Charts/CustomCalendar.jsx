"use client";

import React, { useState } from "react";
import { DateRange } from "react-date-range";
import { format } from "date-fns";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

const CustomCalendar = ({ onDateChange }) => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(new Date().setDate(new Date().getDate() - 30)),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  const applyDateRange = () => {
    const startDate = dateRange[0].startDate.toISOString().split("T")[0];
    const endDate = dateRange[0].endDate.toISOString().split("T")[0];
    onDateChange(startDate, endDate);
    toggleCalendar();
  };

  const formattedStartDate = format(dateRange[0].startDate, "dd.MM.yyyy");
  const formattedEndDate = format(dateRange[0].endDate, "dd.MM.yyyy");

  return (
    <div className="relative">
      <button
        className="rounded-md border p-2 font-medium uppercase text-dark dark:text-dark-6"
        onClick={toggleCalendar}
      >
        {`${formattedStartDate} - ${formattedEndDate}`}
      </button>

      {isCalendarOpen && (
        <div className="absolute left-[-110px] z-50 mt-2 rounded bg-white shadow-lg">
          <DateRange
            editableDateInputs={true}
            onChange={(item) => setDateRange([item.selection])}
            moveRangeOnFirstSelection={false}
            ranges={dateRange}
          />
          <button
            className="mx-auto mt-2 w-full rounded bg-blue-500 px-4 py-2 text-white"
            onClick={applyDateRange}
          >
            Apply
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomCalendar;
