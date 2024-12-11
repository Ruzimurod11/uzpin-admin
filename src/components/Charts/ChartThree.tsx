import { ApexOptions } from "apexcharts";
import React from "react";
import ReactApexChart from "react-apexcharts";

const ChartThree: React.FC = () => {
  const [state, setState] = React.useState({
    series: [65, 34, 12, 56], // eski qiymatlar
    options: {
      chart: {
        width: 380,
        type: "pie", // grafik turini "pie" qilib o'zgartirdik
      },
      labels: ["60UC", "120UC", "180UC", "1200UC"], // nomlar o'zgarmadi
      responsive: [
        {
          breakpoint: 480,
          options: {
            chart: {
              width: 200,
            },
            legend: {
              position: "bottom", // legendani pastga joylashtirish
            },
          },
        },
      ],
    },
  });

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
            options={state.options}
            series={state.series}
            type="pie"
            width={380}
          />
        </div>
      </div>
    </div>
  );
};

export default ChartThree;
