"use client";
import Image from "next/image";
import { FiEdit2 } from "react-icons/fi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import Link from "next/link";
import { useEffect, useState } from "react";
import axiosInstance from "@/libs/axios";
import Loader from "../common/Loader";
import { TbPlayerPlay } from "react-icons/tb";
import ConfirmDeleteModal from "../ConfirmDeleteModal";

interface Info {
  id: string;
  type: string;
  video: string;
}

const TableTgGeneral = () => {
  const [info, setInfo] = useState<Info[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState("");
  useEffect(() => {
    const fetchPartners = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/root/general-info/");
        setInfo(response.data.results || []);
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
      await axiosInstance.delete(`/root/general-info/${gameId}/`);
      setInfo((prevData) => prevData.filter((game) => game.id !== gameId));
      setIsModalOpen("");
    } catch (error) {
      console.error("O'yinni o'chirishda xatolik:", error);
      setIsModalOpen("");
    }
  };
  if (loading) return <Loader />;

  return (
    <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-4 md:px-6 2xl:px-7.5">
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Nomi</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Video</p>
        </div>

        <div className="col-span-1 flex items-center justify-end">
          <p className="font-medium">
            <Link
              href="/general-info-create"
              className="flex w-20 justify-center rounded bg-green-400 px-5 py-1 text-2xl text-white"
            >
              +
            </Link>
          </p>
        </div>
      </div>

      {info.map((product, key) => (
        <div
          className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-4 md:px-6 2xl:px-7.5"
          key={key}
        >
          <div className="col-span-2 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                {key + 1}. {product.type}
              </p>
            </div>
          </div>
          <div className="col-span-1 flex items-center">
            <div className="flex h-12 w-12 flex-col items-center justify-center rounded-full border-2 border-primary ">
              <TbPlayerPlay className="text-[25px] text-primary" />
            </div>
          </div>

          <div className="col-span-1 flex cursor-pointer items-center justify-end gap-2">
            <Link
              href={`/general-info-create?${product.id}`}
              className="rounded bg-[orange] px-3 py-1 text-white"
            >
              <FiEdit2 />
            </Link>
            <div
              onClick={() => DeleteGame(product.id)}
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
        title="Siz ushbu malumotni o'chirmoqchimisiz?"
        description="Bu amalni qaytarib bo'lmaydi. Diqqat bilan tasdiqlang."
      />
    </div>
  );
};

export default TableTgGeneral;
