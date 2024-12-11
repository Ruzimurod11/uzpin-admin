import React, { useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // Kalendar uslubi
import "react-date-range/dist/theme/default.css"; // Tema uslubi

const CustomCalendar = () => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const predefinedRanges = [
    {
      label: "1 Day",
      startDate: new Date(),
      endDate: new Date(),
    },
    {
      label: "1 Week",
      startDate: new Date(new Date().setDate(new Date().getDate() - 7)),
      endDate: new Date(),
    },
    {
      label: "1 Month",
      startDate: new Date(new Date().setMonth(new Date().getMonth() - 1)),
      endDate: new Date(),
    },
  ];

  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  const handleRangeChange = (item) => {
    setDateRange([item.selection]);
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
        <div className="absolute left-[-185px] z-50 mt-2 flex rounded bg-white shadow-lg">
          <div className="absolute  mt-4 w-[40%]">
            {predefinedRanges.map((range, index) => (
              <button
                key={index}
                className="block w-full rounded border bg-gray-100 px-4 py-2 text-left hover:bg-gray-200"
                onClick={() => {
                  setDateRange([
                    {
                      startDate: range.startDate,
                      endDate: range.endDate,
                      key: "selection",
                    },
                  ]);
                  setIsCalendarOpen(false);
                }}
              >
                {range.label}
              </button>
            ))}
          </div>
          <DateRangePicker
            onChange={handleRangeChange}
            showSelectionPreview={true}
            moveRangeOnFirstSelection={false}
            months={1}
            ranges={dateRange}
            staticRanges={[]}
            inputRanges={[]}
          />
        </div>
      )}
    </div>
  );
};

export default CustomCalendar;
