import Image from "next/image";
import Link from "next/link";
import { BiTransfer } from "react-icons/bi";
import { CiDollar } from "react-icons/ci";
import { FaEye, FaMoneyBillTransfer } from "react-icons/fa6";
import { FiEdit2 } from "react-icons/fi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useEffect, useState } from "react";
import SearchForm from "../Header/SearchForm";
import axiosInstance from "@/libs/axios";
import Pagination from "../Pagination";

interface User {
  id: string;
  fullname: string;
  email: string;
  phone: string;
  account_uzs: number;
  account_rub: number;
  account_usd: number;
  login_type: string;
  is_seller: string;
  created: string;
}

const TableUser = () => {
  const [active, setActive] = useState(true);
  const [users, setUser] = useState<User[]>([]);
  const [next, setNext] = useState();
  const [prev, setPrev] = useState();
  const [count, setCount] = useState(0);
  const [page, setPage] = useState(1);

  const fetchStats = async (
    url = `/root/customer/list?is_seller=${!active}`,
  ) => {
    try {
      const response = await axiosInstance.get(url);
      setUser(response.data.results || []);
      setNext(response.data.next);
      setPrev(response.data.previous);
      setCount(Math.ceil(response.data.count / response.data.page_size));
    } catch (error) {
      console.error("Ma'lumotlarni yuklashda xatolik:", error);
    }
  };
  useEffect(() => {
    fetchStats();
  }, [active]);

  const handlePageChange = (newPage: any) => {
    if (newPage > page && next) {
      fetchStats(next);
    } else if (newPage < page && prev) {
      fetchStats(prev);
    }
    setPage(newPage);
  };
  function convertTime(timeStr: string) {
    const date = new Date(timeStr);
    return date.toISOString().slice(0, 19).replace("T", " ");
  }

  return (
    <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="flex items-center justify-between px-4 py-6 md:px-6 xl:px-9">
        <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
          Barcha Foydalanuvchilar
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

      <div className="grid grid-cols-5 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-7 md:px-6 2xl:px-7.5">
        <div className="col-span-2 flex items-center">
          <p className="font-medium">E-Pochta</p>
        </div>
        <div className="col-span-1 flex items-center gap-1">
          <p className="font-medium">Ism</p>
        </div>

        <div className="col-span-1 flex items-center">
          <p className="font-medium">Telefon Raqam</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Yaratilgan vaqt</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Joriy hisob</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium"></p>
        </div>
      </div>

      {users.map((user, key) => (
        <div
          className="grid grid-cols-5 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-7 md:px-6 2xl:px-7.5"
          key={user.id}
        >
          <div className="col-span-2 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                {key + 1}. {user.email}
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
          <div className="col-span-1 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-body-xs font-medium text-dark dark:text-dark-6">
                {convertTime(user.created)}
              </p>
            </div>
          </div>
          <div className="col-span-1 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                {user.account_uzs > 0 && user.account_uzs + "sum"}
                {user.account_rub > 0 && user.account_rub + "rubl"}
                {user.account_usd > 0 && user.account_usd + "usd"}
                {user.account_rub == 0 &&
                  user.account_usd == 0 &&
                  user.account_uzs == 0 &&
                  "0"}
              </p>
            </div>
          </div>
          <div className="col-span-1 flex cursor-pointer items-center gap-2">
            <Link
              href={`user-edit?${user.id}`}
              className="rounded bg-[orange] px-3 py-1 text-white"
            >
              <FiEdit2 />
            </Link>
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
      <Pagination count={count} page={page} onPageChange={handlePageChange} />
    </div>
  );
};

export default TableUser;
