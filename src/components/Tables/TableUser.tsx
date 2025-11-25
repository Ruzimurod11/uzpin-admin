import axiosInstance from "@/libs/axios";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { BiRuble } from "react-icons/bi";
import { CiDollar } from "react-icons/ci";
import { FaLock, FaLockOpen } from "react-icons/fa";
import { FaMoneyBillTransfer } from "react-icons/fa6";
import { IoLogoUsd } from "react-icons/io5";
import { toast } from "react-toastify";
import SearchForm from "../Header/SearchForm";
import Pagination from "../Pagination";
import SwitcherThree from "../SelectOption/SwitcherThree";
import Loader from "../common/Loader";

interface User {
  id: string;
  fullname: string;
  email: string;
  phone: string;
  account_uzs: number;
  account_rub: number;
  account_usd: number;
  login_type: string;
  is_seller: boolean;
  created: string;
  is_active: boolean;
  telegram_id: string;
}

interface TOTALAMOUNT {
  UZS: number;
  RUB: number;
  USD: number;
}

const TableUser = () => {
  const [active, setActive] = useState(true);
  const [lock, setLock] = useState({
    id: "",
    is_active: true,
  });
  const [users, setUser] = useState<User[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search") || "";
  const [formData, setFormData] = useState({
    is_seller: false,
    id: "",
  });
  const [loading, setLoading] = useState(false);

  const [totalAmount, setTotalAmount] = useState<TOTALAMOUNT | null>(null);

  useEffect(() => {
    const fetchCardAmount = async () => {
      try {
        const response = await axiosInstance.get(`/root/customer/total/amount`);
        setTotalAmount(response.data);
      } catch (error) {
        console.error("Failed to fetch card details:", error);
      }
    };

    fetchCardAmount();
  }, []);

  const fetchStats = async (page: number, pageSize: number) => {
    if (!searchQuery) setLoading(true);
    let url = `/root/customer/list?is_seller=${!active}&page=${page}&page_size=${pageSize}`;
    if (searchQuery)
      url = `/root/customer/list?is_seller=${!active}&search=${searchQuery}&page=${page}&page_size=${pageSize}`;
    try {
      const response = await axiosInstance.get(url);
      setUser(response.data.results || []);
      setTotalPages(Math.ceil(response.data.count / pageSize));
    } catch (error) {
      console.error("Ma'lumotlarni yuklashda xatolik:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchStats(currentPage, pageSize);
  }, [active, currentPage, searchQuery, pageSize]);

  const handleSubmit = async () => {
    if (!formData.id) return;
    try {
      await axiosInstance.put(`/root/customer/${formData.id}/detail`, {
        is_seller: formData.is_seller,
      });
      console.log("Karta muvaffaqiyatli yangilandi!");
    } catch (error) {
      console.log("Xatolik yuz berdi. Iltimos, qayta urinib ko'ring.");
    }
  };

  useEffect(() => {
    handleSubmit();
  }, [formData]);

  const handleLock = async () => {
    if (!lock.id) return;
    try {
      await axiosInstance.put(`/root/customer/${lock.id}/detail`, {
        is_active: lock.is_active,
      });
      if (!lock.id) return;
      setUser((prevUsers) =>
        prevUsers.map((u) =>
          u.id === lock.id ? { ...u, is_active: lock.is_active } : u,
        ),
      );
      console.log("Karta muvaffaqiyatli yangilandi!");
    } catch (error) {
      console.log("Xatolik yuz berdi. Iltimos, qayta urinib ko'ring.");
    }
  };
  useEffect(() => {
    handleLock();
  }, [lock]);

  const formatNumber = (num: number) => {
    if (Number.isInteger(num)) {
      return num.toLocaleString("fr-FR").replace(/\s/g, " ");
    }

    return num
      .toFixed(3)
      .replace(",", ".")
      .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const handleCopy = async (user: User) => {
    try {
      await navigator.clipboard.writeText(user.email);
      toast.success(`Id: ${user.email}`);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  if (loading) return <Loader />;
  return (
    <>
      <div className="mb-4 flex w-full justify-between gap-5">
        <div className="flex w-full items-center gap-2 rounded bg-white px-3 py-4 dark:bg-slate-900">
          <div className="rounded bg-[darkgreen] px-4 py-1 text-sm capitalize text-white">
            Dollor
          </div>
          <p className="dark:text-slate-200">
            <b>{totalAmount?.USD ? formatNumber(totalAmount?.USD) : "0"}</b>
          </p>
          <IoLogoUsd />
        </div>
        <div className="flex w-full items-center gap-2 rounded bg-white px-3 py-4 dark:bg-slate-900">
          <div className="rounded bg-[darkgreen] px-4 py-1 text-sm capitalize text-white">
            Sum
          </div>
          <p className="dark:text-slate-200">
            <b>{totalAmount?.UZS ? formatNumber(totalAmount?.UZS) : "0"}</b>
          </p>
          S
        </div>

        <div className="flex w-full items-center gap-2 rounded bg-white px-3 py-4 dark:bg-slate-900">
          <div className="rounded bg-[darkgreen] px-4 py-1 text-sm capitalize text-white">
            Ruble
          </div>
          <p className="dark:text-slate-200">
            <b>{totalAmount?.RUB ? formatNumber(totalAmount?.RUB) : "0"}</b>
          </p>
          <BiRuble />
        </div>
      </div>
      <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
        <div className="flex items-center justify-between px-4 py-6 md:px-6 xl:px-9">
          <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
            Barcha foydalanuvchilar
          </h4>
          <div>
            <SearchForm />
          </div>
          <div className="flex gap-4">
            <button
              className={` rounded border border-slate-400 px-4 py-2  ${active && "bg-primary text-white"}`}
              onClick={() => setActive(true)}
            >
              Oddiy Mijoz
            </button>
            <button
              className={` rounded border border-slate-400 px-4 py-2  ${!active && "bg-primary text-white"}`}
              onClick={() => setActive(false)}
            >
              Sotuvchi
            </button>
          </div>
        </div>

        <div className="grid grid-cols-5 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-8 md:px-6 2xl:px-7.5">
          <div className="col-span-2 flex items-center">
            <p className="font-medium">E-Pochta</p>
          </div>
          <div className="col-span-1 flex items-center gap-1">
            <p className="font-medium">Ism</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Telefon raqam</p>
          </div>
          <div className="col-span-1 flex items-center px-4">
            <p className="font-medium">Joriy hisob</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Yaratilgan vaqt</p>
          </div>
          <div className="col-span-1 flex items-end justify-start gap-2">
            Sotuvchi
          </div>
          <div className="col-span-1 flex items-end justify-end gap-2"></div>
        </div>

        {users.map((user, key) => (
          <div
            className="grid grid-cols-5 border-t border-stroke px-4 py-1 dark:border-dark-3 sm:grid-cols-8 md:px-6 2xl:px-7.5"
            key={user.id}
          >
            <div className="col-span-2 flex items-center">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <p
                  onClick={() => handleCopy(user)}
                  className="cursor-pointer text-body-sm font-medium text-dark dark:text-dark-6"
                >
                  {(currentPage - 1) * 10 + key + 1}. {user.email}
                </p>
              </div>
            </div>
            <div className="col-span-1 flex items-center">
              <div className="flex flex-col gap-1 sm:flex-row sm:items-center">
                <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                  {user.fullname}
                </p>
              </div>
            </div>
            <div className="col-span-1 flex items-center">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                  {user.phone}
                </p>
              </div>
            </div>
            <div className="col-span-1 flex items-center px-4">
              <div className="flex flex-col">
                <p className="flex items-center text-body-xs font-medium text-dark dark:text-dark-6">
                  {user.account_usd ? formatNumber(user.account_usd) : "0"}
                  <IoLogoUsd />
                </p>

                <p className="flex text-body-xs font-medium text-dark dark:text-dark-6">
                  {user.account_uzs ? formatNumber(user.account_uzs) : "0"} S
                </p>
                <p className="flex items-center text-body-xs font-medium text-dark dark:text-dark-6">
                  {user.account_rub ? formatNumber(user.account_rub) : "0"}
                  <BiRuble />
                </p>
              </div>
            </div>
            <div className="col-span-1 flex items-center">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <p className="text-body-xs font-medium text-dark dark:text-dark-6">
                  {new Date(user?.created).toLocaleDateString("uz-UZ")}
                </p>
              </div>
            </div>
            <div className="col-span-1 flex items-center justify-start">
              <SwitcherThree
                isActive={user.is_seller}
                onChange={(value: boolean) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    is_seller: value,
                    id: user.id,
                  }))
                }
                text="&nbsp;"
              />
            </div>

            <div className="col-span-1 flex cursor-pointer items-center justify-end gap-2">
              <button
                onClick={() =>
                  setLock({
                    is_active: !user.is_active,
                    id: user.id,
                  })
                }
                className={`rounded ${user.is_active ? "bg-[#424749]" : "bg-[#ef3333]"} px-3 py-1 text-white`}
              >
                {user.is_active ? <FaLockOpen /> : <FaLock />}
              </button>

              <Link
                href={`money-received?${user.id}`}
                className="rounded bg-[darkblue] px-3 py-1 text-white"
              >
                <FaMoneyBillTransfer />
              </Link>
              <Link
                href={`add-balans?${user.id}`}
                className="rounded bg-[green] px-3 py-1 text-white"
              >
                <CiDollar />
              </Link>
            </div>
          </div>
        ))}
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
      </div>
    </>
  );
};

export default TableUser;
