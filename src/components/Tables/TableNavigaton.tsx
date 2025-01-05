"use client";

import { useEffect, useState } from "react";
import { FaCheck, FaEye } from "react-icons/fa6";
import { FaTimes } from "react-icons/fa";
import axiosInstance from "@/libs/axios";
import Image from "next/image";
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

const TableNavigation = () => {
  const [productData, setProductData] = useState<Notif[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const fetchTransactions = async (page: number) => {
    try {
      const response = await axiosInstance.get(
        `/root/customer/transaction/waiting?page=${page}`,
      );
      setProductData(response.data.results || []);
      setTotalPages(Math.ceil(response.data.count / 10));
      console.log(response.data);
    } catch (error) {
      console.error("API dan ma'lumotni yuklashda xatolik:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchTransactions(currentPage);
  }, [currentPage]);

  const handleAction = async (id: string, status: "ACCEPTED" | "REJECTED") => {
    try {
      await axiosInstance.put(`/root/customer/transaction/${id}/status`, {
        status,
      });
      setProductData((prevData) =>
        prevData.filter((product) => product.id !== id),
      );
    } catch (error) {
      console.error("Harakatni amalga oshirishda xatolik:", error);
    }
  };

  if (loading) return <Loader />;

  return (
    <>
      {productData.length > 0 ? (
        <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
          <div className="px-4 py-6 md:px-6 xl:px-9">
            <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
              Yangi Xabarlar
            </h4>
          </div>

          <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-9 md:px-6 2xl:px-7.5">
            <div className="col-span-2 flex items-center">
              <p className="font-medium">E-Pochta</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Pul miqdori</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Valyuta</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">ISBOT</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Yaratilgan sana</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Holati</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Chek</p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="font-medium">Harakat</p>
            </div>
          </div>

          {productData.map((product, key) => (
            <div
              className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-9 md:px-6 2xl:px-7.5"
              key={product.id}
            >
              <div className="col-span-2 flex items-center">
                <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                  {(currentPage - 1) * 10 + key + 1}. {product.user}
                </p>
              </div>
              <div className="col-span-1 flex items-center justify-center px-4 font-semibold">
                <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                  {product.amount}
                </p>
              </div>
              <div className="col-span-1 flex items-center font-semibold">
                <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                  {product.currency}
                </p>
              </div>
              <div className="col-span-1 flex items-center">
                {product.from_bot ? "Sayt orqali" : "Bot orqali"}
              </div>
              <div className="col-span-1 flex items-center">
                <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                  {new Date(product.created).toLocaleDateString("uz-UZ")}
                </p>
              </div>
              <div className="col-span-1 flex items-center">
                <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                  {product.status === "WAITING" ? "Kutmoqda" : product.status}
                </p>
              </div>
              <div className="col-span-1 flex items-center">
                <FaEye
                  onClick={() => setSelectedImage(product.chek)}
                  className="cursor-pointer"
                />
              </div>

              <div className="col-span-1 flex cursor-pointer items-center gap-2">
                <div
                  className="rounded bg-blue-600 px-6 py-1 text-white"
                  onClick={() => handleAction(product.id, "ACCEPTED")}
                >
                  <FaCheck />
                </div>
                <div
                  className="rounded bg-[red] px-6 py-1 text-white"
                  onClick={() => handleAction(product.id, "REJECTED")}
                >
                  <FaTimes />
                </div>
              </div>
            </div>
          ))}

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={(page) => setCurrentPage(page)}
          />

          {selectedImage && (
            <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black bg-opacity-50">
              <div className="relative rounded bg-white p-4 shadow-lg">
                <button
                  className="absolute right-4 top-4 h-10 w-10 bg-[black] text-3xl text-primary"
                  onClick={() => setSelectedImage(null)}
                >
                  &times;
                </button>
                <Image
                  src={selectedImage}
                  alt="chek"
                  height={300}
                  width={600}
                  className="h-[500px] object-contain "
                />
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="text-2xl">Yangi xabarlar yo&apos;q</div>
      )}
    </>
  );
};

export default TableNavigation;
