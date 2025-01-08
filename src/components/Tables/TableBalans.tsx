"use client";
import { useEffect, useState } from "react";
import SearchForm from "../Header/SearchForm";
import axiosInstance from "@/libs/axios";
import { useSearchParams } from "next/navigation";
import Loader from "../common/Loader";
import Pagination from "../Pagination";

interface Notif {
  id: string;
  user: string;
  amount: number;
  currency: string;
  from_bot: boolean;
  status: string;
  chek: string;
  created: string;
}

const TableBalans = () => {
  const [active, setActive] = useState(true);
  const [productData, setProductData] = useState<Notif[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  useEffect(() => {
    const fetchTransactions = async (page: number) => {
      let url = `root/customer/transaction/list?status=${active ? "ACCEPTED" : "REJECTED"}&page=${page}`;
      if (searchQuery) url += `&search=${searchQuery}`;
      try {
        const response = await axiosInstance.get(url);
        setProductData(response.data.results || []);
        setTotalPages(Math.ceil(response.data.count / 10));
      } catch (error) {
        console.error("API dan ma'lumotni yuklashda xatolik:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions(currentPage);
  }, [active, searchQuery, currentPage]);

  function convertTime(timeStr: string) {
    const localDate = new Date(timeStr);
    const offsetInMs = localDate.getTimezoneOffset() * 60 * 1000;
    const adjustedDate = new Date(localDate.getTime() - offsetInMs);
    return adjustedDate.toISOString().slice(0, 19).replace("T", " ");
  }

  if (loading) return <Loader />;
  return (
    <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="flex items-center justify-between px-4 py-6 md:px-6 xl:px-9">
        <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
          Barcha Foydalanuvchilar
        </h4>
        <SearchForm />
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
      </div>

      {productData.map((product, key) => (
        <div
          className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-6 md:px-6 2xl:px-7.5"
          key={product.id}
        >
          <div className="col-span-2 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                {(currentPage - 1) * 10 + key + 1}. {product.user}
              </p>
            </div>
          </div>
          <div className="col-span-1flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                {product.amount}
              </p>
            </div>
          </div>
          <div className="col-span-1 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                {product.currency}
              </p>
            </div>
          </div>
          <div className="col-span-1 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-body-xs font-medium text-dark dark:text-dark-6">
                {convertTime(product.created)}
              </p>
            </div>
          </div>
          <div className="col-span-1 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                {product.status == "ACCEPTED"
                  ? "Tasdiqlangan"
                  : "Bekor qilingan"}
              </p>
            </div>
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

export default TableBalans;
