"use client";
import React from "react";

import DataStatsOne from "@/components/DataStats/DataStatsOne";
import ChartOne from "../Charts/ChartOne";
import ChartThree from "../Charts/ChartThree";

const ECommerce: React.FC = () => {
  return (
    <>
      <DataStatsOne />
      <ChartOne />
      <ChartThree />
    </>
  );
};

export default ECommerce;
