"use client";
import React, { useEffect, useState } from "react";
import { dataStats } from "../../../types/dataStats";
import axiosInstance from "@/libs/axios";
import { FiUsers } from "react-icons/fi";
import { FaEye } from "react-icons/fa6";
import { IoLogoUsd } from "react-icons/io5";
import { LuBox } from "react-icons/lu";

const dataStatsListTemplate = [
  {
    icon: <FiUsers />,
    color: "#3FD97F",
    title: "Barcha foydalanuvchilar",
    value: "00",
  },
  {
    icon: <FaEye />,
    color: "#FF9C55",
    title: "Barcha promokodlar",
    value: "00",
  },
  {
    icon: <IoLogoUsd />,
    color: "#8155FF",
    title: "Sotilgan promodlar",
    value: "00",
  },
  {
    icon: <LuBox />,
    color: "#18BFFF",
    title: "Qolgan promkodlar",
    value: "00",
  },
];

const DataStatsOne: React.FC<dataStats> = () => {
  const [dataStatsList, setDataStatsList] = useState(dataStatsListTemplate);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axiosInstance.get("/root/analytics/general");
        const {
          total_users,
          total_promocodes,
          sold_promocodes,
          residue_promocodes,
        } = response.data;

        const updatedStatsList = [
          { ...dataStatsListTemplate[0], value: total_users },
          { ...dataStatsListTemplate[1], value: total_promocodes },
          { ...dataStatsListTemplate[2], value: sold_promocodes },
          { ...dataStatsListTemplate[3], value: residue_promocodes },
        ];

        setDataStatsList(updatedStatsList);
      } catch (error) {
        console.error("Ma'lumotlarni yuklashda xatolik:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 gap-2 md:grid-cols-2 md:gap-4 xl:grid-cols-4 2xl:gap-7.5">
        {dataStatsList.map((item, index) => (
          <div
            key={index}
            className="flex gap-2 rounded-[10px] bg-white p-2 shadow-1 dark:bg-gray-dark"
          >
            <div
              className="flex h-12 w-12 items-center justify-center rounded-full text-xl text-white"
              style={{ backgroundColor: item.color }}
            >
              {item.icon}
            </div>

            <div className="mt-1 flex">
              <div>
                <h4 className="mb-1 text-sm text-dark dark:text-white">
                  {item.title}
                </h4>
                <span className="text-body-sm font-medium">
                  {Number(item.value)
                    .toLocaleString("fr-FR", {
                      useGrouping: true,
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 3,
                    })
                    .replace(/\s/g, " ")
                    .replace(",", ".")}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default DataStatsOne;
