"use client";
import { useState } from "react";
import Image from "next/image";
import { FaEye } from "react-icons/fa6";
import { FiEdit2 } from "react-icons/fi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import SearchForm from "../Header/SearchForm";

const productData = [
  {
    email: "jamshidqayimov0399@gmail.com",
    price: "250",
    valyuta: "SUM",
    addDate: "26.11.2024 09:15",
    active: "Tasdiqlandi",
  },
];

const TableBalans = () => {
  const [active, setActive] = useState(true);
  return (
    <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="px-4 py-6 md:px-6 xl:px-9 flex justify-between items-center">
        <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
          Barcha Foydalanuvchilar
        </h4>
        <SearchForm/>
        <div className="flex gap-4">
          <button
            className={` rounded border border-slate-400 px-4 py-2  ${active && "bg-primary text-white"}`}
            onClick={() => setActive(true)}
          >
            Tasqidlangan Balans
          </button>
          <button
            className={` rounded border border-slate-400 px-4 py-2  ${!active && "bg-primary text-white"}`}
            onClick={() => setActive(false)}
          >
            Bekor Qilingan Balans
          </button>
        </div>
      </div>

      <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-6 md:px-6 2xl:px-7.5">
        <div className="col-span-2 flex items-center">
          <p className="font-medium">E-Pochta</p>
        </div>
        <div className="col-span-1flex items-center">
          <p className="font-medium">Pul miqdori</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Valyuta turi</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Yaratilgan sana</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Holati</p>
        </div>

        {/* <div className="col-span-1 flex items-center">
          <p className="font-medium"></p>
        </div> */}
      </div>

      {productData.map((product, key) => (
        <div
          className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-6 md:px-6 2xl:px-7.5"
          key={key}
        >
          <div className="col-span-2 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                {key + 1}. {product.email}
              </p>
            </div>
          </div>
          <div className="col-span-1flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                {product.price}
              </p>
            </div>
          </div>
          <div className="col-span-1 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                {product.valyuta}
              </p>
            </div>
          </div>
          <div className="col-span-1 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                {product.addDate}
              </p>
            </div>
          </div>
          <div className="col-span-1 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                {product.active}
              </p>
            </div>
          </div>

          {/* <div className="col-span-1 flex cursor-pointer items-center gap-2">
            <div className="rounded bg-blue-600 px-3 py-1 text-white">
              <FaEye />
            </div>
            <div className="rounded bg-[orange] px-3 py-1 text-white">
              <FiEdit2 />
            </div>
            <div className="rounded bg-[red] px-3 py-1 text-white">
              <MdOutlineDeleteOutline />
            </div>
          </div> */}
        </div>
      ))}
    </div>
  );
};

export default TableBalans;
