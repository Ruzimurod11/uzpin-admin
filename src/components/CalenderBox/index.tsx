"use client";
import { useState } from "react";
import DefaultSelectOption from "../SelectOption/DefaultSelectOption";
import TableInfos from "../Tables/TableInfos";
import CustomCalendar2 from "../Charts/CustomCalendar2";

const CalendarBox = () => {
  const [activeFilter, setActiveFilter] = useState<string>("All");
  const [activeBot, setActiveBot] = useState<string | null>(null);

  return (
    <>
      <div className="flex flex-col">
        <div className="flex justify-between">
          <p className="text-2xl">Ma&apos;lumotlar</p>
          <div className="flex items-center gap-2">
            Saralash:
            <CustomCalendar2 />
            {["ID", "Vaucher"].map((filter) => (
              <button
                key={filter}
                className={`text-nowrap rounded-[5px] px-6 py-1 ${
                  activeFilter === filter
                    ? "bg-primary text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="mb-2 mt-4 flex gap-2 overflow-x-auto">
          {["Uzpin Sayt", "UzpinBot", "SardorBot", "TonyBot", "AnotherBot"].map(
            (botName, index) => (
              <button
                key={index}
                className={`h-[40px] text-nowrap rounded-[5px] border px-6 ${
                  activeBot === botName
                    ? "border-primary bg-primary text-white"
                    : "border-primary text-primary"
                }`}
                onClick={() => setActiveBot(botName)}
              >
                {botName}
              </button>
            ),
          )}
        </div>
        <TableInfos name={"PUBG"} />
        <TableInfos name={"FREEFIRE"} />
      </div>
    </>
  );
};

export default CalendarBox;
