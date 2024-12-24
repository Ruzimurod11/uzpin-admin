"use client";
import Image from "next/image";
import { Product } from "../../../types/product";
import { FaEye } from "react-icons/fa6";
import { FiEdit2 } from "react-icons/fi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import Link from "next/link";
import SearchForm from "../Header/SearchForm";
import { useEffect, useState } from "react";
import axiosInstance from "@/libs/axios";

interface Info {
  id: string;
  email: string;
  phone: string;
  fullname: string;
  game: string;
  promocode: string;
  count: number;
  price: number;
  amount: number;
  currency: string;
  sold_type: string;
  created: string;
}

const TableSalesPromoBox = () => {
  const [data, setData] = useState<Info[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axiosInstance.get(`/root/sold/list`);
        setData(response.data.results || []);
      } catch (error) {
        console.error("Ma'lumotlarni yuklashda xatolik:", error);
      }
    };

    fetchStats();
  }, []);
  function convertTime(timeStr: string) {
    const date = new Date(timeStr);
    return date.toISOString().slice(0, 19).replace("T", " ");
  }
  return (
    <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="flex items-center justify-between px-4 py-6 md:px-6 xl:px-9">
        <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
          Sotilgan promokodlar
        </h4>
        <SearchForm />
      </div>

      <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-9 md:px-6 2xl:px-7.5">
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Promokod</p>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Foydalanuvchi nomi</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Miqdori</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Narxi</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Ummumiy Narxi</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Pul birligi</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Sotuv turi</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Yaratilgan sana</p>
        </div>
      </div>

      {data.map((product, key) => (
        <div
          className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-9 md:px-6 2xl:px-7.5"
          key={key}
        >
          <div className="col-span-1 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                {key + 1}. 💵 {product.promocode}
              </p>
            </div>
          </div>
          <div className="col-span-2 flex items-center">
            <p className="text-body-sm font-medium text-dark dark:text-dark-6">
              {product.fullname}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-body-sm font-medium text-dark dark:text-dark-6">
              {product.count}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-body-sm font-medium text-dark dark:text-dark-6">
              {product.price}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-body-sm font-medium text-dark dark:text-dark-6">
              {product.amount}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-body-sm font-medium text-dark dark:text-dark-6">
              {product.currency}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-body-sm font-medium text-dark dark:text-dark-6">
              {product.sold_type}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-body-xs font-medium text-dark dark:text-dark-6">
              {convertTime(product.created)}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableSalesPromoBox;
