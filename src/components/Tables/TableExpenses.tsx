import axiosInstance from "@/libs/axios";
import { useEffect, useState } from "react";

interface Info {
  game: string;
  promocode: string;
  count: number;
  amount: number;
  price: number;
  currency: string;
  sold_type: string;
  created: string;
}

const TableExpenses = ({ id }: any) => {
  const [data, setData] = useState<Info[]>([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await axiosInstance.get(
          `/root/customer/${id}/expenses`,
        );
        setData(response.data.results || []);
      } catch (error) {
        console.error("Ma'lumotlarni yuklashda xatolik:", error);
      }
    };

    fetchStats();
  }, [id]);
  function convertTime(timeStr: string) {
    const date = new Date(timeStr);
    return date.toISOString().slice(0, 19).replace("T", " ");
  }
  return (
    <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-10 md:px-6 2xl:px-7.5">
        <div className="col-span-3 flex items-center">
          <p className="font-medium">Promokod kategoriyasi</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Miqdori</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Narxi</p>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="font-medium"> Umumiy narxi</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Pul birligi</p>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Yaratilgan sana</p>
        </div>
      </div>

      {data.length > 0 ? (
        data.map((product, key) => (
          <div
            className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-10 md:px-6 2xl:px-7.5"
            key={key}
          >
            <div className="col-span-3 flex items-center">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                  {key + 1}. {product.promocode}
                </p>
              </div>
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
            <div className="col-span-2 flex items-center">
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                {product.amount}
              </p>
            </div>
            <div className="col-span-1 flex items-center">
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                {product.currency}
              </p>
            </div>
            <div className="col-span-2 flex items-center">
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                {convertTime(product.created)}
              </p>
            </div>
          </div>
        ))
      ) : (
        <div className=" border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-10 md:px-6 2xl:px-7.5">
          <p></p>
        </div>
      )}
    </div>
  );
};

export default TableExpenses;
