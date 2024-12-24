import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import { ApexOptions } from "apexcharts";
import axiosInstance from "@/libs/axios";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const ChartThree: React.FC = () => {
  const [chartData, setChartData] = useState<{
    series: number[];
    options: ApexOptions;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/root/analytics/top");
        const data = response.data;

        // Convert fetched data to chart format
        const labels = data.map(
          (item: { promocode: string }) => item.promocode,
        );
        const series = data.map((item: { count: number }) => item.count);

        setChartData({
          series,
          options: {
            chart: {
              type: "pie",
              width: 380,
            },
            labels,
            responsive: [
              {
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200,
                  },
                  legend: {
                    position: "bottom",
                  },
                },
              },
            ],
          },
        });
      } catch (error) {
        setError("Ma'lumotlarni yuklashda xatolik yuz berdi.");
      }
    };

    fetchData();
  }, []);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!chartData) return <p>Yuklanmoqda...</p>;

  return (
    <div className="col-span-12 rounded-[10px] bg-white px-7.5 pb-7 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card xl:col-span-5">
      <div className="mb-9 justify-between gap-4 sm:flex">
        <div>
          <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
            Kategoriya bo&apos;yicha sotilish
          </h4>
        </div>
      </div>
      <div className="mb-8">
        <div className="mx-auto flex justify-center">
          <ReactApexChart
            options={chartData.options}
            series={chartData.series}
            type="pie"
            width={380}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartThree;
