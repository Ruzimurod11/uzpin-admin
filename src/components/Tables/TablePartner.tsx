"use client";
import Image from "next/image";
import Link from "next/link";
import { FiEdit2 } from "react-icons/fi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { useEffect, useState } from "react";
import axiosInstance from "@/libs/axios";
import { log } from "console";
import { useSearchParams } from "next/navigation";

interface Partner {
  id: string;
  firstname: string;
  partner_name: string;
  banner_uz: string;
  banner_ru: string;
  banner_en: string;
}

const TablePartner = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const searchParams = useSearchParams();

  const fullQuery = searchParams?.toString();
  const extractedValue = fullQuery?.split("=")[0];

  console.log("Extracted Value:", extractedValue);

  useEffect(() => {
    const fetchPartners = async () => {
      try {
        const response = await axiosInstance.get("/root/bot/list");
        setPartners(response.data.results || []);
        console.log(response.data.results, "test");
      } catch (error) {
        console.error("Hamkorlarni yuklashda xatolik:", error);
      }
    };

    fetchPartners();
  }, []);

  const DeleteGame = async (gameId: string) => {
    try {
      await axiosInstance.delete(`/root/bot/${gameId}/delete`);
      setPartners((prevData) => prevData.filter((game) => game.id !== gameId));
    } catch (error) {
      console.error("O'yinni o'chirishda xatolik:", error);
    }
  };

  return (
    <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="flex items-center justify-between px-4 py-6 md:px-6 xl:px-9">
        <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
          Barcha Hamkorlar
        </h4>
        <Link
          href="/partnor-create"
          className="flex w-20 justify-center rounded bg-green-400 px-5 py-1 text-2xl text-white"
        >
          +
        </Link>
      </div>

      <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-6 md:px-6 2xl:px-7.5">
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Nomi</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Bot Nomi</p>
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
          <p className="font-medium"></p>
        </div>
      </div>

      {partners.map((partner, index) => (
        <div
          className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-6 md:px-6 2xl:px-7.5"
          key={partner.id}
        >
          <div className="col-span-1 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                {index + 1}. {partner.firstname}
              </p>
            </div>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-body-sm font-medium text-dark dark:text-dark-6">
              {partner.partner_name}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <div className="h-12.5 w-15 rounded-md">
              <Image
                src={partner.banner_uz}
                width={60}
                height={50}
                alt="Uz Banner"
              />
            </div>
          </div>
          <div className="col-span-1 flex items-center">
            <div className="h-12.5 w-15 rounded-md">
              <Image
                src={partner.banner_ru}
                width={60}
                height={50}
                alt="Ru Banner"
              />
            </div>
          </div>
          <div className="col-span-1 flex items-center">
            <div className="h-12.5 w-15 rounded-md">
              <Image
                src={partner.banner_en}
                width={60}
                height={50}
                alt="En Banner"
              />
            </div>
          </div>

          <div className="col-span-1 flex cursor-pointer items-center justify-end gap-2">
            <Link
              href={`/partnor-create?${partner.id}`}
              className="rounded bg-[orange] px-3 py-1 text-white"
            >
              <FiEdit2 />
            </Link>
            <div
              onClick={() => DeleteGame(partner.id)}
              className="rounded bg-[red] px-3 py-1 text-white"
            >
              <MdOutlineDeleteOutline />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TablePartner;
