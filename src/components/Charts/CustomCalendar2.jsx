import React, { useState } from "react";
import { DateRange, DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // Kalendar uslubi
import "react-date-range/dist/theme/default.css"; // Tema uslubi

const CustomCalendar = () => {
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

  return (
    <div className="relative">
      <button
        className="rounded-md border p-2 font-medium uppercase text-dark dark:text-dark-6"
        onClick={toggleCalendar}
      >
        {`${dateRange[0].startDate.toLocaleDateString()} - ${dateRange[0].endDate.toLocaleDateString()}`}
      </button>

      {isCalendarOpen && (
        <div className="absolute z-50 mt-2 rounded bg-white shadow-lg">
          <DateRangePicker
            onChange={(item) => setState([item.selection])}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={1}
            ranges={dateRange}
            direction="horizontal"
          />
          ;
          <button
            className="mx-auto mt-2 w-full rounded bg-blue-500 px-4 py-2 text-white"
            onClick={toggleCalendar}
          >
            Apply
          </button>
        </div>
      )}
    </div>
  );
};

export default CustomCalendar;
