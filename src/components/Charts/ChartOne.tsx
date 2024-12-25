import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import CustomCalendar from "./CustomCalendar";
import { ApexOptions } from "apexcharts";
import axiosInstance from "@/libs/axios";
import Loader from "../common/Loader";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});

const ChartOne = () => {
  const [chartData, setChartData] = useState<{
    series: { name: string; data: number[] }[];
    options: ApexOptions;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get("/root/analytics/line");
        const data = response.data;

        // Transform data to fit chart format
        const categories = data.map((item: { date: string }) => {
          const [month, year] = item.date.split("-");
          return `22/${month}`;
        });
        const seriesData = data.map(
          (item: { total_sales: number }) => item.total_sales,
        );

        setChartData({
          series: [
            {
              name: "Received Amount",
              data: seriesData,
            },
          ],
          options: {
            legend: {
              show: false,
              position: "top",
              horizontalAlign: "left",
            },
            colors: ["#5750F1"],
            chart: {
              fontFamily: "Satoshi, sans-serif",
              height: 310,
              type: "area",
              toolbar: {
                show: true,
              },
            },
            fill: {
              gradient: {
                opacityFrom: 0.55,
                opacityTo: 0,
              },
            },
            responsive: [
              {
                breakpoint: 1024,
                options: {
                  chart: {
                    height: 300,
                  },
                },
              },
              {
                breakpoint: 1366,
                options: {
                  chart: {
                    height: 320,
                  },
                },
              },
            ],
            stroke: {
              curve: "smooth",
            },
            markers: {
              size: 0,
            },
            grid: {
              strokeDashArray: 5,
              xaxis: {
                lines: {
                  show: false,
                },
              },
              yaxis: {
                lines: {
                  show: true,
                },
              },
            },
            dataLabels: {
              enabled: true,
            },
            tooltip: {
              fixed: {
                enabled: false,
              },
              x: {
                show: false,
              },
              y: {
                title: {
                  formatter: () => "",
                },
              },
              marker: {
                show: false,
              },
            },
            xaxis: {
              type: "category",
              categories,
              axisBorder: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
            },
            yaxis: {
              title: {
                style: {
                  fontSize: "0px",
                },
              },
            },
          },
        });
      } catch (error) {
        setError("Ma'lumotlarni yuklashda xatolik yuz berdi.");
      }
    };

    fetchData();
  }, []);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!chartData) return <Loader />;

  return (
    <div className="col-span-12 rounded-[10px] bg-white px-7.5 pb-6 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card md:my-5 xl:col-span-7">
      <div className="mb-3.5 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
            Oxirgi Bir Oyda Sotilgan Kodlar
          </h4>
        </div>
        <CustomCalendar />
      </div>
      <div>
        <div className="-ml-4 -mr-5">
          <ReactApexChart
            options={chartData.options}
            series={chartData.series}
            type="area"
            height={310}
          />
        </div>
      </div>

      <div className="flex flex-col gap-2 text-center xsm:flex-row xsm:gap-0">
        <div className="flex items-center justify-center gap-4 border-stroke dark:border-dark-3 xsm:w-full xsm:border-r">
          <p className="font-medium">30 Kunlik Sotuv</p>
          <h4 className="text-xl font-bold text-dark dark:text-white">$00</h4>
        </div>
      </div>
    </div>
  );
};

export default ChartOne;
