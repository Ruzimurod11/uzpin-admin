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
        <div className="flex justify-end"></div>

        <TableInfos name={"PUBG"} />
      </div>
    </>
  );
};

export default CalendarBox;
