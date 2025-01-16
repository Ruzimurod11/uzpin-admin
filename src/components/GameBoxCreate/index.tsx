"use client";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/libs/axios";
import SelectGroupOne from "../SelectGame/SelectGroupOne";
import UploadComponent from "../UploadComponent";
import { useRouter, useSearchParams } from "next/navigation";
import { AlertError, AlertSuccess } from "../Alerts/AlertComponents";
import { toast } from "react-toastify";

const GamesBoxCreate = () => {
  const router = useRouter();

  const searchParams = useSearchParams();

  const fullQuery = searchParams?.toString();
  const extractedValue = fullQuery?.split("=")[0];

  const [nameUz, setNameUz] = useState("");
  const [nameRu, setNameRu] = useState("");
  const [nameEn, setNameEn] = useState("");
  const [cover, setCover] = useState("");
  const [photo, setPhoto] = useState("");
  const [video, setVideo] = useState("");
  const [descUz, setDescUz] = useState("");
  const [descRu, setDescRu] = useState("");
  const [descEn, setDescEn] = useState("");

  const [selectedGame, setSelectedGame] = useState<string>("");

  useEffect(() => {
    const fetchCardDetails = async () => {
      if (extractedValue) {
        try {
          const response = await axiosInstance.get(
            `/root/game/games/${extractedValue}/detail`,
          );

          setNameUz(response.data.name_uz || "");
          setNameRu(response.data.name_ru || "");
          setNameEn(response.data.name_en || "");
          setCover(response.data.cover || "");
          setPhoto(response.data.photo || "");
          setVideo(response.data.video || "");
          setDescUz(response.data.desc_uz || "");
          setDescRu(response.data.desc_ru || "");
          setDescEn(response.data.desc_en || "");

          // is_active: is_active !== undefined ? is_active : true,
        } catch (error) {
          console.error("Failed to fetch card details:", error);
        }
      }
    };

    fetchCardDetails();
  }, [extractedValue]);

  const gameOptions = [
    { value: "SIMPLE", label: "SIMPLE" },
    { value: "POPULAR", label: "Mashhur" },
    { value: "BEST_SELLER", label: "Ko'p Sotilgan" },
  ];

  const handleSelectChange = (value: string) => setSelectedGame(value);

  const handleUploadSuccess = (key: string, url: string) => {
    if (key === "cover") setCover(url);
    if (key === "photo") setPhoto(url);
    if (key === "video") setVideo(url);
  };

  const handleSubmit = async () => {
    const payload = {
      name_uz: nameUz,
      name_ru: nameRu,
      name_en: nameEn,
      type: selectedGame,
      cover,
      photo,
      video,
      desc_uz: descUz,
      desc_ru: descRu,
      desc_en: descEn,
    };

    try {
      if (extractedValue) {
        await axiosInstance.put(
          `/root/game/games/${extractedValue}/detail`,
          payload,
        );
        router.push("/games");
        toast.success("O'yin muvaffaqiyatli yangilandi!");
      } else {
        await axiosInstance.post("/root/game/games", payload);
        router.push("/games");
        toast.success("O'yin muvaffaqiyatli yaratildi!");
      }
    } catch (error) {
      toast.error("O'yin yaratishda xatolik bo'ldi!");
    }
  };

  return (
    <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
      <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
        <h3 className="font-medium text-dark dark:text-white">
          Yangi O&apos;yin Ma&apos;lumotlari
        </h3>
      </div>

      <div className="grid grid-cols-6 gap-5.5 p-6.5">
        <div className="col-span-6">
          <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
            O&apos;yin turi
          </label>
          <SelectGroupOne
            options={gameOptions}
            selectedOption={selectedGame}
            onChange={handleSelectChange}
          />
        </div>
        <div className="col-span-3">
          <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
            Asosiy rasm
          </label>
          <UploadComponent
            onUploadSuccess={(url) => handleUploadSuccess("cover", url)}
          />
        </div>
        <div className="col-span-3">
          <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
            Banner rasmi
          </label>
          <UploadComponent
            onUploadSuccess={(url) => handleUploadSuccess("photo", url)}
          />
        </div>
        <div className="col-span-6">
          <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
            Video
          </label>
          <UploadComponent
            onUploadSuccess={(url) => handleUploadSuccess("video", url)}
          />
        </div>
        <div className="col-span-2">
          <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
            O&apos;yin Nomi [UZ]
          </label>
          <input
            type="text"
            placeholder="O'yin Nomi"
            value={nameUz}
            onChange={(e) => setNameUz(e.target.value)}
            className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
          />
        </div>
        <div className="col-span-2">
          <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
            O&apos;yin Nomi [RU]
          </label>
          <input
            type="text"
            placeholder="O'yin Nomi"
            value={nameRu}
            onChange={(e) => setNameRu(e.target.value)}
            className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
          />
        </div>
        <div className="col-span-2">
          <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
            O&apos;yin Nomi [EN]
          </label>
          <input
            type="text"
            placeholder="O'yin Nomi"
            value={nameEn}
            onChange={(e) => setNameEn(e.target.value)}
            className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
          />
        </div>
        <div className="col-span-2">
          <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
            Izoh [UZ]
          </label>
          <textarea
            rows={6}
            placeholder="Izoh"
            value={descUz}
            onChange={(e) => setDescUz(e.target.value)}
            className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
          ></textarea>
        </div>
        <div className="col-span-2">
          <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
            Izoh [RU]
          </label>
          <textarea
            rows={6}
            placeholder="Izoh"
            value={descRu}
            onChange={(e) => setDescRu(e.target.value)}
            className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
          ></textarea>
        </div>
        <div className="col-span-2">
          <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
            Izoh [EN]
          </label>
          <textarea
            rows={6}
            placeholder="Izoh"
            value={descEn}
            onChange={(e) => setDescEn(e.target.value)}
            className="w-full rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
          ></textarea>
        </div>
        <div className="col-span-6 flex justify-end">
          <button
            onClick={handleSubmit}
            className="flex w-40 justify-center rounded bg-green-400 px-5 py-2 text-white"
          >
            SAQLASH
          </button>
        </div>
      </div>
    </div>
  );
};

export default GamesBoxCreate;
