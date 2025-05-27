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
import Pagination from "../Pagination";
import SwitcherThree from "../SelectOption/SwitcherThree";

interface Game {
  id: string;
  name_uz: string;
  cover: string;
  photo: string;
  is_active: boolean;
  order: number;
}

const TableGame = () => {
  const [data, setData] = useState<Game[]>([]);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchStats = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/root/game/games?page=${currentPage}`,
      );
      setData(response.data.results || []);
      setTotalPages(Math.ceil(response.data.count / 10));
    } catch (error) {
      console.error("Ma'lumotlarni yuklashda xatolik:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchStats();
  }, [currentPage]);

  const DeleteGame = (id: any) => {
    setIsModalOpen(id);
  };

  const handleDelete = async (gameId: string) => {
    try {
      await axiosInstance.delete(`/root/game/games/${gameId}/detail`);
      setData((prevData) => prevData.filter((game) => game.id !== gameId));
      setIsModalOpen("");
      toast.warn("Muvaffaqiyatli O'chirildi");
    } catch (error) {
      console.error("O'yinni o'chirishda xatolik:", error);
    }
  };

  const handleStatus = async (gameId: string, status: boolean) => {
    try {
      await axiosInstance.patch(`/root/game/games/${gameId}/detail`, {
        is_active: status,
      });
      setData((prevData) =>
        prevData.map((game) =>
          game.id === gameId ? { ...game, is_active: status } : game,
        ),
      );
      toast.warn("Muvaffaqiyatli O'zgartirildi");
    } catch (error) {
      console.error("O'yinni o'chirishda xatolik:", error);
    }
  };

  const handleOrder = async (gameId: string, order: number) => {
    try {
      await axiosInstance.patch(`/root/game/games/${gameId}/detail`, {
        order: order,
      });
      setData((prevData) =>
        prevData.map((game) =>
          game.id === gameId ? { ...game, order: order } : game,
        ),
      );
      toast.warn("Muvaffaqiyatli O'zgartirildi");
    } catch (error) {
      console.error("O'yinni o'chirishda xatolik:", error);
    } finally {
      fetchStats();
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="flex items-center justify-between px-4 py-6 md:px-6 xl:px-9">
        <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
          O&apos;yinlar
        </h4>
        <Link
          href="games-create"
          className="flex w-20 justify-center rounded bg-green-400 px-5 py-1 text-2xl text-white"
        >
          +
        </Link>
      </div>

      <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-2 flex items-center">
          <p className="font-medium">O&apos;yin nomi</p>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Asosiy rasm</p>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Banner rasm</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Holati</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium"></p>
        </div>
      </div>

      {data.length > 0 &&
        data.map((game, index) => (
          <div
            className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-8 md:px-6 2xl:px-7.5"
            key={game.id}
          >
            {/* <Link
              href={`games/${game.id}}`}
              className="col-span-2 flex items-center"
            > */}
            <div className="col-span-2 flex items-center">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
                <input
                  type="text"
                  maxLength={2}
                  defaultValue={game?.order}
                  onBlur={(e) => handleOrder(game.id, Number(e.target.value))}
                  onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                    e.target.value = e.target.value.replace(/\D/g, ""); // Faqat raqam qoldirish
                  }}
                  className="max-w-[34px] rounded-md px-[5px] outline-none"
                />
                <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                  {index + 1}. {game?.name_uz}
                </p>
              </div>
            </div>
            {/* </Link> */}
            <Link
              href={`games/${game.id}`}
              className="col-span-2 flex items-center"
            >
              <div className="flex h-12.5 w-15 items-center justify-center rounded-md">
                <Image
                  className="max-h-[50px] max-w-[60px]"
                  src={game?.cover}
                  width={60}
                  height={50}
                  alt="game"
                />
              </div>
            </Link>
            <Link
              href={`games/${game.id}`}
              className="col-span-2 flex items-center"
            >
              <div className="h-12.5 w-15 rounded-md">
                <Image
                  className="flex max-h-[50px] max-w-[60px] items-center justify-center"
                  src={game?.photo}
                  width={60}
                  height={50}
                  alt="game"
                />
              </div>
            </Link>
            <div className="col-span-1 flex items-center">
              <SwitcherThree
                isActive={game.is_active}
                onChange={(value: boolean) => handleStatus(game.id, value)}
                text="&nbsp;"
              />
            </div>
            <div className="col-span-1 flex cursor-pointer items-center justify-end gap-2">
              <Link href={`games-create?${game.id}`}>
                <div className="rounded bg-[orange] px-3 py-1 text-white">
                  <FiEdit2 size={20} />
                </div>
              </Link>
              {game.id == "00984e54-78f0-44f8-ad48-dac23d838bdc" ? (
                <div
                  className={
                    "cursor-not-allowed rounded bg-[#cecece] px-3 py-1 text-black"
                  }
                >
                  <MdOutlineDeleteOutline size={20} />
                </div>
              ) : (
                <div
                  onClick={() => DeleteGame(game.id)}
                  className={"rounded bg-[red] px-3 py-1 text-white"}
                >
                  <MdOutlineDeleteOutline size={20} />
                </div>
              )}
            </div>
          </div>
        ))}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
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

export default TableGame;
