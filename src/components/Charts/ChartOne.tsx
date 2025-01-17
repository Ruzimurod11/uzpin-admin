import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";
import CustomCalendar from "./CustomCalendar";
import { ApexOptions } from "apexcharts";
import axiosInstance from "@/libs/axios";
import Loader from "../common/Loader";
import { useRouter } from "next/navigation";
import { IoLogoUsd } from "react-icons/io5";
import { BiRuble } from "react-icons/bi";

const ReactApexChart = dynamic(() => import("react-apexcharts"), {
  ssr: false,
});
interface Amount {
  USD: number;
  UZS: number;
  RUB: number;
}
const ChartOne = () => {
  const [chartData, setChartData] = useState<{
    series: { name: string; data: number[] }[];
    options: ApexOptions;
  } | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [time, setTime] = useState("");

  const [amount, setAmount] = useState<Amount | null>(null);

  const handleDateChange = (startDate: string, endDate: string) => {
    const queryParams = new URLSearchParams({
      start_date: startDate,
      end_date: endDate,
    }).toString();

    setTime(queryParams);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(
          `/root/analytics/line?${time}`,
        );
        const data = response.data.sales;
        setAmount(response.data.total_amount);

        const categories = data.map((item: { date: string }) => {
          const [month, day] = item.date.split("-");
          return `${day}/${month}`;
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
  }, [time]);

  const router = useRouter();

  const formatNumber = (num: number) => {
    return num % 1 === 0 ? num.toFixed(0) : num.toFixed(2);
  };

  if (error) return <p className="text-red-500">{error}</p>;
  if (!chartData) return <Loader />;

  return (
    <div className="col-span-12 rounded-[10px] bg-white px-7.5 pb-6 pt-7.5 shadow-1 dark:bg-gray-dark dark:shadow-card md:my-5 xl:col-span-7">
      <div className="mb-3.5 flex flex-col gap-2.5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
            Oxirgi bir oyda sotilgan kodlar
          </h4>
        </div>
        <CustomCalendar onDateChange={handleDateChange} />
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
          <h4 className="flex items-center text-xl font-bold text-dark dark:text-white">
            {amount?.USD ? formatNumber(amount.USD) : "0"} <IoLogoUsd />
          </h4>
          <h4 className="flex items-center text-xl font-bold text-dark dark:text-white">
            {amount?.UZS ? formatNumber(amount.UZS) : "0"} S
          </h4>
          <h4 className="flex items-center text-xl font-bold text-dark dark:text-white">
            {amount?.RUB ? formatNumber(amount.RUB) : "0"} <BiRuble />
          </h4>
        </div>
      </div>
    </div>
  );
};

export default ChartOne;
