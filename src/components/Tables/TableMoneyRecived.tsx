import axiosInstance from "@/libs/axios";
import { useEffect, useState } from "react";
import Loader from "../common/Loader";

interface Info {
  status: string;
  currency: string;
  amount: number;
  chek: string;
  created: string;
}

const TableMoneyRecived = ({ id }: any) => {
  const [data, setData] = useState<Info[]>([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchStats = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(
          `/root/customer/${id}/transactions`,
        );
        setData(response.data.results || []);
      } catch (error) {
        console.error("Ma'lumotlarni yuklashda xatolik:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, [id]);
  function convertTime(timeStr: string) {
    const date = new Date(timeStr);
    return date.toISOString().slice(0, 19).replace("T", " ");
  }
  if (loading) return <Loader />;
  return (
    <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-4 md:px-6 2xl:px-7.5">
        <div className="col-span-1 flex items-center">
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

      {data.map((product, key) => (
        <div
          className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-4 md:px-6 2xl:px-7.5"
          key={key}
        >
          <div className="col-span-1 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                {key + 1}. {product.amount}
              </p>
            </div>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-body-sm font-medium text-dark dark:text-dark-6">
              {product.currency}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-body-sm font-medium text-dark dark:text-dark-6">
              {convertTime(product.created)}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-body-sm font-medium text-dark dark:text-dark-6">
              {product.chek ? "Tasdiqlangan" : "Bekor qilingan"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableMoneyRecived;
