"use client";
import axiosInstance from "@/libs/axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import CustomCalendar from "../Charts/CustomCalendar";
import Loader from "../common/Loader";
import SearchForm from "../Header/SearchForm";
import Pagination from "../Pagination";

interface Info {
  id: string;
  email: string;
  phone: string;
  fullname: string;
  gamer_id: number;
  status: string;
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
  const [filter, setFilter] = useState("");
  const [time, setTime] = useState("");

  const handleDateChange = (startDate: string, endDate: string) => {
    const queryParams = new URLSearchParams({
      start_date: startDate,
      end_date: endDate,
    }).toString();
    setTime(queryParams);
  };

  const fetchStats = async (page: number, timeParam?: string) => {
    if (!searchQuery) setLoading(true);

    try {
      const response = await axiosInstance.get(
        `/root/sold/list?${timeParam}&search=${searchQuery}&status=${filter}&page=${page}&page_size=30`,
      );
      setData(response.data.results || []);
      setTotalPages(Math.ceil(response.data.count / 30));
    } catch (error) {
      console.error("Ma'lumotlarni yuklashda xatolik:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchStats(currentPage, time);
  }, [searchQuery, currentPage, filter, time]);
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

  const options = [
    { id: "NEW", name: "Yangi buyurtma" },
    { id: "ACCEPTED", name: "Waiting" },
    { id: "DONE", name: "Accept" },
    { id: "REJECTED", name: "Reject" },
  ];
  const DefaultSelectOptionId1 = ({
    onChange,
    value,
  }: {
    onChange: (selectedId: string) => void;
    value: string;
  }) => {
    // 👇 options endi lokal holatda, backenddan kelmaydi

    // Dropdownda tanlov o'zgarganda chaqiriladi
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      onChange(event.target.value); // faqat id jo'natiladi
    };

    return (
      <select
        value={value || ""}
        onChange={handleChange}
        className="select-class rounded border p-2 text-lg capitalize outline-none"
      >
        <option value="">Barchasi</option>
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    );
  };

  const handleChange = (selectedId: string) => {
    setFilter(selectedId);
  };
  const handleStatusChange = async (id: string, newStatus: string) => {
    try {
      const response = await axiosInstance.patch(`/root/sold/update/${id}`, {
        status: newStatus,
      });
      setData((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, status: newStatus } : item,
        ),
      );
      window.location.reload();
    } catch (error) {
      console.error("Statusni yangilashda xatolik:", error);
    }
  };

  console.log(filter);
  if (loading) return <Loader />;
  return (
    <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="flex items-center justify-between px-4 py-6 md:px-6 xl:px-9">
        <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
          Sotilgan promokodlar
        </h4>
        <DefaultSelectOptionId1 onChange={handleChange} value={filter} />
        <SearchForm />

        <div className="col-span-3 flex items-center justify-end gap-4">
          <span className="whitespace-nowrap">Saralash:</span>
          <CustomCalendar onDateChange={handleDateChange} />
        </div>
      </div>
      <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-12 md:px-6 2xl:px-7.5">
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Promokod</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Gamer id</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Status</p>
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
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Yaratilgan sana</p>
        </div>
      </div>

      {data.map((product, key) => (
        <div
          className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-12 md:px-6 2xl:px-7.5"
          key={key}
        >
          <div className="col-span-1 flex items-center">
            <div className="flex max-w-[220px] flex-col gap-4 sm:flex-row sm:items-center">
              <p className="line-clamp-1 text-body-sm font-medium text-dark dark:text-dark-6">
                {(currentPage - 1) * 10 + key + 1}. {product.promocode}
              </p>
            </div>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-body-sm font-medium text-dark dark:text-dark-6">
              {product.gamer_id}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <select
              className="w-full rounded-[5px] p-1"
              value={product.status}
              onChange={(e) => handleStatusChange(product.id, e.target.value)}
            >
              <option value="NEW">Yangi</option>
              <option value="ACCEPTED">Waiting</option>
              <option value="DONE">Accept</option>
              <option value="REJECTED">Reject</option>
            </select>
          </div>
          <div className="col-span-2 flex items-center justify-center">
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
