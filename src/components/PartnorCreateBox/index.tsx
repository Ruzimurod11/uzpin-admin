"use client";
import { useEffect, useState } from "react";
import axiosInstance from "@/libs/axios";
import UploadComponent from "@/components/UploadComponent";
import { useRouter, useSearchParams } from "next/navigation";

export default function PartnorCreateBox() {
  const [formData, setFormData] = useState({
    token: "",
    partner_name: "",
    banner_uz: "",
    banner_ru: "",
    banner_en: "",
  });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const searchParams = useSearchParams();

  const fullQuery = searchParams?.toString();
  const extractedValue = fullQuery?.split("=")[0];

  useEffect(() => {
    const fetchCardDetails = async () => {
      if (extractedValue) {
        try {
          const response = await axiosInstance.get(
            `/root/bot/${extractedValue}/update`,
          );
          const { token, partner_name, banner_uz, banner_ru, banner_en } =
            response.data;

          setFormData({
            token: token || "",
            partner_name: partner_name || "",
            banner_uz: banner_uz || "",
            banner_ru: banner_ru || "",
            banner_en: banner_en || "",
          });
          console.log(response.data);
        } catch (error) {
          console.error("Failed to fetch card details:", error);
        }
      }
    };

    fetchCardDetails();
  }, [extractedValue]);

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUploadSuccess = (key: string, url: string) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: url,
    }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    try {
      await axiosInstance.post("/root/bot/create", formData);
      alert("Hamkor muvaffaqiyatli qo'shildi!");
      router.push("/partners/partner");
    } catch (error) {
      console.error("Hamkor qo'shishda xatolik:", error);
      alert("Xatolik yuz berdi. Iltimos, qayta urinib ko'ring.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl">
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
          <h3 className="font-medium text-dark dark:text-white">
            Hamkor Qo&apos;shish
          </h3>
        </div>
        <form
          className="grid grid-cols-6 gap-5.5 p-6.5"
          onSubmit={handleSubmit}
        >
          <div className="col-span-3">
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              Hamkor
            </label>
            <input
              type="text"
              name="partner_name"
              value={formData.partner_name}
              onChange={handleChange}
              className="w-full cursor-pointer rounded-[7px] border-[1.5px] border-stroke px-3 py-[9px] outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-stroke file:px-2.5 file:py-1 file:text-body-xs file:font-medium file:text-dark-5 focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-dark dark:border-dark-3 dark:bg-dark-2 dark:file:border-dark-3 dark:file:bg-white/30 dark:file:text-white"
            />
          </div>
          <div className="col-span-3">
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              Bot Token
            </label>
            <input
              type="text"
              name="token"
              value={formData.token}
              onChange={handleChange}
              className="w-full cursor-pointer rounded-[7px] border-[1.5px] border-stroke px-3 py-[9px] outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-stroke file:px-2.5 file:py-1 file:text-body-xs file:font-medium file:text-dark-5 focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-dark dark:border-dark-3 dark:bg-dark-2 dark:file:border-dark-3 dark:file:bg-white/30 dark:file:text-white"
            />
          </div>
          <div className="col-span-2">
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              Banner UZ
            </label>
            <UploadComponent
              onUploadSuccess={(url) => handleUploadSuccess("banner_uz", url)}
            />
          </div>
          <div className="col-span-2">
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              Banner RU
            </label>
            <UploadComponent
              onUploadSuccess={(url) => handleUploadSuccess("banner_ru", url)}
            />
          </div>
          <div className="col-span-2">
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              Banner EN
            </label>
            <UploadComponent
              onUploadSuccess={(url) => handleUploadSuccess("banner_en", url)}
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
        </form>
      </div>
    </div>
  );
}
