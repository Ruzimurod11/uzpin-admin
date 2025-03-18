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

interface Partner {
  id: string;
  firstname: string;
  partner_name: string;
  banner_uz: string;
  banner_ru: string;
  banner_en: string;
  logo?: string;
  chat_id?: number;
}

const TablePartner = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState("");

  useEffect(() => {
    const fetchPartners = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/root/bot/list");
        setPartners(response.data.results || []);
        console.log(response.data.results);
      } catch (error) {
        console.error("Hamkorlarni yuklashda xatolik:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPartners();
  }, []);

  const DeleteGame = (id: any) => {
    setIsModalOpen(id);
  };
  const handleDelete = async (gameId: string) => {
    try {
      await axiosInstance.delete(`/root/bot/${gameId}/delete`);
      setPartners((prevData) => prevData.filter((game) => game.id !== gameId));
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
          Barcha hamkorlar
        </h4>
        <div className="flex gap-4">
          <Link
            href="/partnor-create"
            className="flex w-20 justify-center rounded bg-green-400 px-5 py-1 text-2xl text-white"
          >
            +
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-7 md:px-6 2xl:px-7.5">
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Hamkor nomi</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Bot nomi</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Banner Uz</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Banner Ru</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Banner En</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Hamkor logo</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium"></p>
        </div>
      </div>

      {partners.map((partner, index) => (
        <div
          className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-7 md:px-6 2xl:px-7.5"
          key={partner.id}
        >
          <div className="col-span-1 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                {index + 1}. {partner.partner_name}
              </p>
            </div>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-body-sm font-medium text-dark dark:text-dark-6">
              {partner.firstname}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <div className="h-12.5 w-15 rounded-md">
              {partner.banner_uz && (
                <Image
                  src={partner.banner_uz}
                  width={60}
                  height={50}
                  alt="Uz Banner"
                  className="mx-auto max-h-12.5 w-auto"
                />
              )}
            </div>
          </div>
          <div className="col-span-1 flex items-center">
            <div className="h-12.5 w-15 rounded-md">
              {partner.banner_ru && (
                <Image
                  src={partner.banner_ru}
                  width={60}
                  height={50}
                  alt="Ru Banner"
                  className="mx-auto max-h-12.5 w-auto"
                />
              )}
            </div>
          </div>
          <div className="col-span-1 flex items-center">
            <div className="h-12.5 w-15 rounded-md">
              {partner.banner_en && (
                <Image
                  src={partner.banner_en}
                  width={60}
                  height={50}
                  alt="Ru Banner"
                  className="mx-auto max-h-12.5 w-auto"
                />
              )}
            </div>
          </div>
          <div className="col-span-1 flex items-center">
            <div className="h-12.5 w-15 rounded-md">
              {partner.logo && (
                <Image
                  src={partner.logo}
                  width={60}
                  height={50}
                  alt="En Banner"
                  className="mx-auto max-h-12.5 w-auto"
                />
              )}
            </div>
          </div>

          <div className="col-span-1 flex cursor-pointer items-center justify-end gap-2">
            {/* 1544b528-4e21-4a4b-8c09-31c5771eb55e */}
            {/* 596aece6-31dc-4d4b-b774-e1b5a461bf1d */}
            <Link
              href={
                partner.id === "596aece6-31dc-4d4b-b774-e1b5a461bf1d" ||
                partner.id === "1544b528-4e21-4a4b-8c09-31c5771eb55e"
                  ? `#`
                  : `/partnor-create?${partner.id}`
              }
              className={`rounded bg-[orange] px-3 py-1 text-white ${
                partner.id === "596aece6-31dc-4d4b-b774-e1b5a461bf1d" ||
                partner.id === "1544b528-4e21-4a4b-8c09-31c5771eb55e"
                  ? "cursor-not-allowed"
                  : ""
              }`}
            >
              <FiEdit2 />
            </Link>
            <button
              disabled={
                partner.id === "596aece6-31dc-4d4b-b774-e1b5a461bf1d" ||
                partner.id === "1544b528-4e21-4a4b-8c09-31c5771eb55e"
              }
              onClick={() => DeleteGame(partner.id)}
              className={`rounded bg-[red] px-3 py-1 text-white ${
                partner.id === "596aece6-31dc-4d4b-b774-e1b5a461bf1d" ||
                partner.id === "1544b528-4e21-4a4b-8c09-31c5771eb55e"
                  ? "cursor-not-allowed"
                  : ""
              }`}
            >
              <MdOutlineDeleteOutline />
            </button>
          </div>
        </div>
      ))}

      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen("")}
        onConfirm={() => handleDelete(isModalOpen)}
        title="Siz ushbu hamkorni o'chirmoqchimisiz?"
        description="Bu amalni qaytarib bo'lmaydi. Diqqat bilan tasdiqlang."
      />
    </div>
  );
};

export default TablePartner;
