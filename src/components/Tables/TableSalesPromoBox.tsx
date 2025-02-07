"use client";
import SearchForm from "../Header/SearchForm";
import { useEffect, useState } from "react";
import axiosInstance from "@/libs/axios";
import { useSearchParams } from "next/navigation";
import Loader from "../common/Loader";
import Pagination from "../Pagination";

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
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";

  const fetchStats = async (page: number) => {
    if (!searchQuery) setLoading(true);

    try {
      const response = await axiosInstance.get(
        `/root/sold/list?search=${searchQuery}&page=${page}`,
      );
      setData(response.data.results || []);
      setTotalPages(Math.ceil(response.data.count / 10));
    } catch (error) {
      console.error("Ma'lumotlarni yuklashda xatolik:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchStats(currentPage);
  }, [searchQuery, currentPage]);
  function convertTime(timeStr: string) {
    const localDate = new Date(timeStr);
    const offsetInMs = localDate.getTimezoneOffset() * 60 * 1000;
    const adjustedDate = new Date(localDate.getTime() - offsetInMs);
    return adjustedDate.toISOString().slice(0, 19).replace("T", " ");
  }

  const formatNumber = (num: number) => {
    return num % 1 === 0 ? num.toFixed(0) : num.toFixed(2);
  };

  if (loading) return <Loader />;
  return (
    <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="flex items-center justify-between px-4 py-6 md:px-6 xl:px-9">
        <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
          Sotilgan promokodlar
        </h4>
        <SearchForm />
      </div>

      <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-10 md:px-6 2xl:px-7.5">
        <div className="col-span-2 flex items-center">
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
          <p className="font-medium">Ummumiy</p>
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
          className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-10 md:px-6 2xl:px-7.5"
          key={key}
        >
          <div className="col-span-2 flex items-center">
            <div className="flex max-w-[220px] flex-col gap-4 sm:flex-row sm:items-center">
              <p className="line-clamp-1 text-body-sm font-medium text-dark dark:text-dark-6">
                {(currentPage - 1) * 10 + key + 1}. 💵 {product.promocode}
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
              {product.price ? formatNumber(product.price) : "0"}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-body-sm font-medium text-dark dark:text-dark-6">
              {product.amount ? formatNumber(product.amount) : "0"}
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
            <p className="text-nowrap text-body-xs font-medium text-dark dark:text-dark-6">
              {convertTime(product.created)}
            </p>
          </div>
        </div>
      ))}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default TableSalesPromoBox;
