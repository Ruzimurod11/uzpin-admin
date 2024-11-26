import React, { useState } from "react";
import { DateRangePicker } from "react-date-range";
import "react-date-range/dist/styles.css"; // Kalendar uslubi
import "react-date-range/dist/theme/default.css"; // Tema uslubi

const CustomCalendar = () => {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false); // Kalendarni ko'rsatish/nodon holati
  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(new Date().setDate(new Date().getDate() - 30)), // 30 kun oldingi sana
      endDate: new Date(), // Bugungi sana
      key: "selection",
    },
  ]);

  // Sana tanlanganda chaqiriladi
  const handleDateChange = (ranges) => {
    setDateRange([ranges.selection]);
  };

  // Kalendarni ochish/yopish funksiyasi
  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  return (
    <div className="relative">
      {/* Tugma - Sana diapazonini ko'rsatish */}
      <button
        className="rounded-md border p-2 font-medium uppercase text-dark dark:text-dark-6"
        onClick={toggleCalendar}
      >
        {`${dateRange[0].startDate.toLocaleDateString()} - ${dateRange[0].endDate.toLocaleDateString()}`}
      </button>

      {/* Kalendar faqat `isCalendarOpen` bo'lsa ko'rinadi */}
      {isCalendarOpen && (
        <div className="absolute left-[-110px] z-50 mt-2 rounded bg-white shadow-lg">
          <DateRangePicker
            ranges={dateRange}
            onChange={handleDateChange}
            rangeColors={["#4CAF50"]}
            months={1}
            direction="horizontal"
            showSelectionPreview={false}
            moveRangeOnFirstSelection={false}
            staticRanges={[]} // Yon panelni o'chirish
            inputRanges={[]} // Foydalanuvchi kiritmalarini o'chirish
          />
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
