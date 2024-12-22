"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import SwitcherThree from "@/components/SelectOption/SwitcherThree";
import { useState, useEffect, Suspense } from "react";
import axiosInstance from "@/libs/axios";
import UploadComponent from "@/components/UploadComponent";
import SelectGroupOne from "@/components/SelectGame/SelectGroupOne";
import { useRouter, useSearchParams } from "next/navigation";
import InputMask from "react-input-mask";
export default function AddCardBox() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const fullQuery = searchParams?.toString();
  const extractedValue = fullQuery?.split("=")[0];

  const [formData, setFormData] = useState({
    photo: "",
    card_name: "",
    card_number: "",
    card_holder: "",
    currency: "",
    is_active: true,
  });

  const [loading, setLoading] = useState(false);
  const [selectedGame, setSelectedGame] = useState<string>("");

  useEffect(() => {
    const fetchCardDetails = async () => {
      if (extractedValue) {
        try {
          const response = await axiosInstance.get(
            `/root/card/${extractedValue}/detail`,
          );
          const {
            photo,
            card_name,
            card_number,
            card_holder,
            currency,
            is_active,
          } = response.data;

          setFormData({
            photo: photo || "",
            card_name: card_name || "",
            card_number: card_number || "",
            card_holder: card_holder || "",
            currency: currency || "",
            is_active: is_active !== undefined ? is_active : true,
          });

          setSelectedGame(currency || "");
        } catch (error) {
          console.error("Failed to fetch card details:", error);
        }
      }
    };

    fetchCardDetails();
  }, [extractedValue]);

  const handleChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const gameOptions = [
    { value: "UZS", label: "SUMM" },
    { value: "RUB", label: "RUBLE" },
    { value: "USD", label: "DOLLOR" },
  ];

  const handleUploadSuccess = (key: string, url: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: url,
    }));
  };

  const handleSelectChange = (value: string) => setSelectedGame(value);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (extractedValue) {
        await axiosInstance.put(`/root/card/${extractedValue}/detail`, {
          ...formData,
          currency: selectedGame,
        });
      } else {
        await axiosInstance.post(`/root/card/list`, {
          ...formData,
          currency: selectedGame,
        });
      }

      console.log("Karta muvaffaqiyatli yangilandi!");

      router.push("/general/add-card");
    } catch (error) {
      console.error("Karta yangilashda xatolik:", error);
      console.log("Xatolik yuz berdi. Iltimos, qayta urinib ko'ring.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="mx-auto max-w-7xl">
      <Breadcrumb pageName="Karta Qo'shish" />
      <form
        onSubmit={handleSubmit}
        className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card"
      >
        {/* <Breadcrumb pageName="Karta Qo'shish" /> */}
        <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
          <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
            <h3 className="font-medium text-dark dark:text-white">
              Yangi Karta Ma&apos;lumotlari
            </h3>
          </div>
          <div className="grid grid-cols-6 gap-5.5 p-6.5">
            <div className="col-span-6">
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                Karta Rasmi
              </label>
              <UploadComponent
                onUploadSuccess={(url) => handleUploadSuccess("photo", url)}
              />
            </div>
            <div className="col-span-3">
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                Karta nomi
              </label>
              <input
                type="text"
                name="card_name"
                value={formData.card_name}
                onChange={handleChange}
                className="w-full cursor-pointer rounded-[7px] border-[1.5px] border-stroke px-3 py-[9px] outline-none transition"
              />
            </div>
            <div className="col-span-3">
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                Karta raqami
              </label>
              <InputMask
                mask="9999 9999 9999 9999"
                placeholder="0000 0000 0000 0000"
                type="text"
                name="card_number"
                value={formData.card_number}
                onChange={handleChange}
                className="w-full cursor-pointer rounded-[7px] border-[1.5px] border-stroke px-3 py-[9px] outline-none transition"
              />
            </div>
            <div className="col-span-3">
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                Karta egasi
              </label>
              <input
                type="text"
                name="card_holder"
                value={formData.card_holder}
                onChange={handleChange}
                className="w-full cursor-pointer rounded-[7px] border-[1.5px] border-stroke px-3 py-[9px] outline-none transition"
              />
            </div>
            <div className="col-span-3">
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                Valyuta turi
              </label>
              <SelectGroupOne
                options={gameOptions}
                selectedOption={selectedGame}
                onChange={handleSelectChange}
              />
            </div>
            <div className="col-span-6">
              <SwitcherThree
                isActive={formData.is_active}
                onChange={(value: boolean) =>
                  setFormData((prevData) => ({
                    ...prevData,
                    is_active: value,
                  }))
                }
              />
            </div>
            <div className="col-span-6 flex justify-end">
              <button
                type="submit"
                disabled={loading}
                className="flex w-40 justify-center rounded bg-green-400 px-5 py-2 text-white"
              >
                {loading ? "Saqlanmoqda..." : "SAQLASH"}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
