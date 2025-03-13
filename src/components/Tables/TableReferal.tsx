"use client";
import Image from "next/image";
import Link from "next/link";
import { FiEdit2 } from "react-icons/fi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useEffect, useState } from "react";
import axiosInstance from "@/libs/axios";
import Loader from "../common/Loader";
import ConfirmDeleteModal from "../ConfirmDeleteModal";
import { FaTelegramPlane } from "react-icons/fa";
import PartnorModalMsg from "../PartnorMsgModal";
import { toast } from "react-toastify";
import { FaRegCopy } from "react-icons/fa6";
import { FaCheck } from "react-icons/fa";

interface Referal {
  id: string;
  fullname: string;
  promo_code: string;
  discount: number;
  link: string;
  users_count: number;
}

const TableReferal = () => {
  const [referals, setReferals] = useState<Referal[]>([]);
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState("");

  useEffect(() => {
    const fetchReferals = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/root/partner/");
        setReferals(response.data.results || []);
        console.log(response.data.results);
      } catch (error) {
        console.error("Hamkorlarni yuklashda xatolik:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReferals();
  }, []);

  const DeleteGame = (id: any) => {
    setIsModalOpen(id);
  };
  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };
  const handleDelete = async (gameId: string) => {
    try {
      await axiosInstance.delete(`/root/bot/${gameId}/delete`);
      setReferals((prevData) => prevData.filter((game) => game.id !== gameId));
      setIsModalOpen("");
      toast.warn("Muvaffaqiyatli O'chirildi");
    } catch (error) {
      console.error("O'yinni o'chirishda xatolik:", error);
    }
  };

  if (loading) return <Loader />;
  return (
    <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="flex items-center justify-between px-4 py-6 md:px-6 xl:px-9">
        <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
          Referal hamkorlar
        </h4>
        <div className="flex gap-4">
          <Link
            href="/referal-create"
            className="flex w-20 justify-center rounded bg-green-400 px-5 py-1 text-2xl text-white"
          >
            +
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-11 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-9 md:px-6 2xl:px-7.5">
        <div className="col-span-1 flex items-center">
          <p className="font-medium">#</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Hamkor nomi</p>
        </div>
        <div className="col-span-3 flex items-center">
          <p className="font-medium">Referal link</p>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="font-medium">PromoCode</p>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Userlar soni</p>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="font-medium"></p>
        </div>
      </div>

      {referals.map((referal, index) => (
        <div
          className="grid grid-cols-11 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-9 md:px-6 2xl:px-7.5"
          key={referal.id}
        >
          <div className="col-span-1 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                {index + 1}.
              </p>
            </div>
          </div>
          <div className="col-span-1 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                {referal.fullname}
              </p>
            </div>
          </div>
          <div className="col-span-3 flex items-center">
            <p className="max-w-[250px] text-body-sm font-medium text-dark dark:text-dark-6">
              {referal.link}
            </p>
            <button
              onClick={() => copyToClipboard(referal.link, referal.id)}
              className="ml-2 rounded bg-gray-200 p-2 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
            >
              {copiedId === referal.id ? (
                <FaCheck size={20} className="text-green-500" />
              ) : (
                <FaRegCopy size={20} />
              )}
            </button>
          </div>
          <div className="col-span-2 flex items-center">
            <p className="text-body-sm font-medium text-dark dark:text-dark-6">
              {referal.promo_code}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-body-sm font-medium text-dark dark:text-dark-6">
              {referal.users_count}
            </p>
          </div>

          <div className="col-span-1 flex cursor-pointer items-center justify-end gap-2">
            <Link
              href={`/referal-create?${referal.id}`}
              className="rounded bg-[orange] px-3 py-1 text-white"
            >
              <FiEdit2 />
            </Link>
            <div
              //   onClick={() => DeleteGame(referal.id)}
              className="rounded bg-[red] px-3 py-1 text-white"
            >
              <MdOutlineDeleteOutline />
            </div>
          </div>
        </div>
      ))}

      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen("")}
        onConfirm={() => handleDelete(isModalOpen)}
        title="Siz ushbu referalni o'chirmoqchimisiz?"
        description="Bu amalni qaytarib bo'lmaydi. Diqqat bilan tasdiqlang."
      />
    </div>
  );
};

export default TableReferal;
