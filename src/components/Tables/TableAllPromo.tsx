"use client";

import { useEffect, useState } from "react";
import axiosInstance from "@/libs/axios";
import { useRouter } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa6";
import { MdOutlineDeleteOutline } from "react-icons/md";

interface Promo {
  id: string;
  code: string;
  promocode: string;
  is_sold: boolean;
  created: string;
}
const TableAllPromo = () => {
  const [productData, setProductData] = useState<Promo[]>([]);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  const getIdFromPathname = () => {
    if (typeof window !== "undefined") {
      const pathParts = window.location.pathname.split("/");
      return pathParts[pathParts.length - 1];
    }
    return null;
  };

  const id = getIdFromPathname();

  useEffect(() => {
    const fetchPromocodes = async () => {
      if (!id) {
        console.error("ID aniqlanmadi!");
        return;
      }

      try {
        const response = await axiosInstance.get(
          `/root/game/promocodevalues/${id}`,
        );
        setProductData(response.data.results || []);
      } catch (error) {
        console.error("Ma'lumotlarni yuklashda xatolik:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPromocodes();
  }, [id]);

  if (loading) {
    return <div>Yuklanmoqda...</div>;
  }

  function convertTime(timeStr: string) {
    const date = new Date(timeStr);
    return date.toISOString().slice(0, 19).replace("T", " ");
  }
  const goBack = () => {
    router.back();
  };
  return (
    <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="grid grid-cols-11 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-11 md:px-6 2xl:px-7.5">
        <div
          onClick={goBack}
          className="col-span-2 flex cursor-pointer items-center gap-4"
        >
          <FaArrowLeft />
          <p className="font-medium">Promokod</p>
        </div>
        <div className="col-span-4 flex items-center">
          <p className="font-medium">Kod</p>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Holati</p>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Yaratilgan sana</p>
        </div>
        <div className="col-span-1 flex items-center justify-end">
          <div className="rounded bg-[red] px-3 py-1 text-white">
            <MdOutlineDeleteOutline />
          </div>
        </div>
      </div>

      {productData.length > 0 &&
        productData.map((product, key) => (
          <div
            className="grid grid-cols-11 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-11 md:px-6 2xl:px-7.5"
            key={product?.id}
          >
            <div className="col-span-2 flex items-center gap-4">
              <input type="checkbox" />
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                {product?.promocode}
              </p>
            </div>
            <div className="col-span-4 flex items-center">
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                {product?.code}
              </p>
            </div>
            <div className="col-span-2 flex items-center">
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                {product?.is_sold ? "Sotilgan" : "Sotilmagan"}
              </p>
            </div>
            <div className="col-span-2 flex items-center">
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                {convertTime(product?.created)}
              </p>
            </div>
            <div className="col-span-1 flex cursor-pointer items-center gap-2"></div>
          </div>
        ))}
    </div>
  );
};

export default TableAllPromo;
