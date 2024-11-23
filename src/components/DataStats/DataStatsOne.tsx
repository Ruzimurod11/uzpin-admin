import React from "react";
import { dataStats } from "@/types/dataStats";

const DataStatsOne: React.FC<dataStats> = () => {
  return (
    <>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
        Asosiy Malumotlar
      </div>
    </>
  );
};

export default DataStatsOne;
