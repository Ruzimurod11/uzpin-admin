"use client";
import axiosInstance from "@/libs/axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { toast } from "react-toastify";
import Loader from "../common/Loader";
import ConfirmDeleteModal from "../ConfirmDeleteModal";
import "./TableCard.css";

interface Card {
  id: string;
  photo: string;
  card_name: string;
  card_number: string;
  card_holder: string;
  currency: string;
  is_active: boolean;
  order: number;
}

const TableCard = () => {
  const [cards, setCards] = useState<Card[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState("");
  const [refetch, setRefetch] = useState(false);

  useEffect(() => {
    const fetchCards = async () => {
      setLoading(true);
      try {
        const response = await axiosInstance.get("/root/card/list", {
          params: {
            page: 1,
            page_size: 20,
          },
        });
        setCards(response.data.results || []);
      } catch (error) {
        console.error("Kartalarni yuklashda xatolik:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, [refetch]);

  const DeleteGame = (id: any) => {
    setIsModalOpen(id);
  };

  const handleDelete = async (gameId: string) => {
    try {
      await axiosInstance.delete(`/root/card/${gameId}/detail`);
      setCards((prevData) => prevData.filter((game) => game.id !== gameId));
      setIsModalOpen("");
      toast.warn("Muvaffaqiyatli O'chirildi");
    } catch (error) {
      console.error("O'yinni o'chirishda xatolik:", error);
    }
  };

  const handleOrder = async (gameId: string, order: number) => {
    try {
      await axiosInstance.patch(`/root/card/${gameId}/detail`, {
        order: order,
      });
      setCards((prevData) =>
        prevData.map((game) =>
          game.id === gameId ? { ...game, order: order } : game,
        ),
      );
      toast.warn("Muvaffaqiyatli O'zgartirildi");
      setRefetch(true);
    } catch (error) {
      console.error("O'yinni o'chirishda xatolik:", error);
    } finally {
      setRefetch(!refetch);
    }
  };

  if (loading) return <Loader />;
  return (
    <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="flex items-center justify-between px-4 py-6 md:px-6 xl:px-9">
        <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
          Karta ma&apos;lumotlari
        </h4>
        <Link
          href="addcard"
          className="flex w-20 justify-center rounded bg-green-400 px-5 py-1 text-2xl text-white"
        >
          +
        </Link>
      </div>

      <div className="grid grid-cols-12 border-t border-stroke px-4 py-4.5 dark:border-dark-3 max-sm:grid-cols-7 md:px-6 2xl:px-7.5">
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Karta rasmi</p>
        </div>
        <div className="col-span-3 flex items-center">
          <p className="ml-4 font-medium">Karta nomi</p>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Karta raqami</p>
        </div>
        <div className="col-span-3 flex items-center">
          <p className="font-medium">Karta egasi</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Valyuta</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Holati</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium"></p>
        </div>
      </div>

      {cards.map((card, index) => (
        <div
          className="grid grid-cols-12 border-t border-stroke px-4 py-4.5 dark:border-dark-3 max-sm:grid-cols-7 md:px-6 2xl:px-7.5"
          key={index}
        >
          <div className="col-span-1 flex items-center">
            <div className="flex h-12.5 w-15 items-center gap-2 rounded-md">
              <input
                type="text"
                maxLength={2}
                defaultValue={card?.order}
                onBlur={(e) => handleOrder(card.id, Number(e.target.value))}
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                  e.target.value = e.target.value.replace(/\D/g, ""); // Faqat raqam qoldirish
                }}
                className="max-w-[34px] rounded-md px-[5px] outline-none"
              />
              <Image src={card.photo} width={60} height={50} alt="Card Image" />
            </div>
          </div>
          <div className="col-span-3 flex items-center">
            <p className="tooltip cursor-pointer text-body-sm font-medium text-dark dark:text-dark-6">
              <span>{card.card_name?.slice(0, 26)}</span>
              <span className="tooltiptext">{card.card_name}</span>
            </p>
          </div>
          <div className="col-span-2 flex items-center">
            <p className="tooltip cursor-pointer text-body-sm font-medium text-dark dark:text-dark-6">
              <span>{card.card_number?.slice(0, 10)}</span>
              <span className="tooltiptext">{card.card_number}</span>
            </p>
          </div>
          <div className="col-span-3 flex items-center">
            <p className="text-body-sm font-medium text-dark dark:text-dark-6">
              {card.card_holder}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-body-sm font-medium text-dark dark:text-dark-6">
              {card.currency}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-body-sm font-medium text-dark dark:text-dark-6">
              {card.is_active ? "Faol" : "Faol emas"}
            </p>
          </div>
          <div className="col-span-1 flex cursor-pointer items-center justify-center gap-2">
            <Link
              href={`addcard?${card.id}`}
              className="rounded bg-[orange] px-3 py-1 text-white"
            >
              <FiEdit2 />
            </Link>
            <div
              onClick={() => DeleteGame(card.id)}
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

export default TableCard;
