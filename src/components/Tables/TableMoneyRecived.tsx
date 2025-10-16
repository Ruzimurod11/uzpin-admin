import axiosInstance from "@/libs/axios";
import { useEffect, useState } from "react";
import Loader from "../common/Loader";
import Pagination from "../Pagination";

interface Info {
  status: string;
  currency: string;
  amount: number;
  chek: string;
  created: string;
}

const TableMoneyRecived = ({ id }: any) => {
  const [data, setData] = useState<Info[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const fetchStats = async (page: number, pageSize: number) => {
      setLoading(true);
      try {
        const response = await axiosInstance.get(
          `/root/customer/${id}/transactions?page=${page}&page_size=${pageSize}`,
        );
        setData(response.data.results || []);
        setTotalPages(Math.ceil(response.data.count / pageSize));
      } catch (error) {
        console.error("Ma'lumotlarni yuklashda xatolik:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats(currentPage, pageSize);
  }, [id, currentPage, pageSize]);
  function convertTime(timeStr: string) {
    const localDate = new Date(timeStr);
    const offsetInMs = localDate.getTimezoneOffset() * 60 * 1000;
    const adjustedDate = new Date(localDate.getTime() - offsetInMs);
    return adjustedDate.toISOString().slice(0, 19).replace("T", " ");
  }

  const formatNumber = (num: number) => {
    if (Number.isInteger(num)) {
      return num.toLocaleString("fr-FR").replace(/\s/g, " ");
    }

    return num
      .toFixed(3)
      .replace(",", ".")
      .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

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
                {(currentPage - 1) * 10 + key + 1}.{" "}
                {product.amount ? formatNumber(product.amount) : 0}
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
            <p
              className={`text-body-sm font-medium dark:text-dark-6 ${product.status == "ACCEPTED" ? "text-green" : "text-red"} `}
            >
              {product.status == "ACCEPTED" ? "Tasdiqlangan" : "Bekor qilingan"}
            </p>
          </div>
        </div>
      ))}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={(page) => setCurrentPage(page)}
          pageSize={pageSize}
          onPageSizeChange={(size) => {
            setPageSize(size);
            setCurrentPage(1);
          }}
        />
      )}
    </div>
  );
};

export default TableMoneyRecived;
