import Image from "next/image";
import Link from "next/link";
import { BiRuble, BiTransfer } from "react-icons/bi";
import { CiDollar } from "react-icons/ci";
import { FaEye, FaMoneyBillTransfer } from "react-icons/fa6";
import { FiEdit2 } from "react-icons/fi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useEffect, useState } from "react";
import SearchForm from "../Header/SearchForm";
import axiosInstance from "@/libs/axios";
import Pagination from "../Pagination";
import { IoLogoUsd } from "react-icons/io5";

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
    <>
      <div className="mb-4 flex w-full justify-between gap-5">
        <div className="flex w-full items-center gap-2 rounded bg-white px-3 py-4 dark:bg-slate-900">
          <div className="rounded bg-[darkgreen] px-4 py-1 text-sm capitalize text-white">
            Dollor
          </div>
          <p className="dark:text-slate-200">
            <b>1.13</b>
          </p>
          <IoLogoUsd />
        </div>
        <div className="flex w-full items-center gap-2 rounded bg-white px-3 py-4 dark:bg-slate-900">
          <div className="rounded bg-[darkgreen] px-4 py-1 text-sm capitalize text-white">
            Sum
          </div>
          <p className="dark:text-slate-200">
            <b>123 313</b>
          </p>
          S
        </div>

        <div className="flex w-full items-center gap-2 rounded bg-white px-3 py-4 dark:bg-slate-900">
          <div className="rounded bg-[darkgreen] px-4 py-1 text-sm capitalize text-white">
            Ruble
          </div>
          <p className="dark:text-slate-200">
            <b>1.13</b>
          </p>
          <BiRuble />
        </div>
      </div>
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

        <div className="grid grid-cols-5 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-8 md:px-6 2xl:px-7.5">
          <div className="col-span-2 flex items-center">
            <p className="font-medium">E-Pochta</p>
          </div>
          <div className="col-span-1 flex items-center gap-1">
            <p className="font-medium">Ism</p>
          </div>

          <div className="col-span-1 flex items-center">
            <p className="font-medium">Telefon Raqam</p>
          </div>
          <div className="col-span-2 flex items-center px-4">
            <p className="font-medium">Joriy hisob</p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="font-medium">Yaratilgan vaqt</p>
          </div>
          <div className="col-span-1 flex items-end justify-end gap-2">
            {/* <p className="flex items-center border-b-2 border-[green] text-body-xs font-bold text-green dark:text-dark-6">
            100 000
            <IoLogoUsd />
          </p>

          <p className="flex  items-center border-b-2 border-[green] text-body-xs font-bold text-green dark:text-dark-6">
            100 000 000 S
          </p>
          <p className="flex items-center border-b-2 border-[green] text-body-xs font-bold text-green dark:text-dark-6">
            10 000 000
            <BiRuble />
          </p> */}
          </div>
        </div>

        {users.map((user, key) => (
          <div
            className="grid grid-cols-5 border-t border-stroke px-4 py-1 dark:border-dark-3 sm:grid-cols-8 md:px-6 2xl:px-7.5"
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
            <div className="col-span-2 flex items-center px-4">
              <div className="flex flex-col">
                <p className="flex items-center text-body-xs font-medium text-dark dark:text-dark-6">
                  {user.account_usd}
                  <IoLogoUsd />
                </p>

                <p className="flex text-body-xs font-medium text-dark dark:text-dark-6">
                  {user.account_uzs} S
                </p>
                <p className="flex items-center text-body-xs font-medium text-dark dark:text-dark-6">
                  {user.account_rub}
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
    </>
  );
};

export default TableUser;
