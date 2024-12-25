"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import axiosInstance from "@/libs/axios";
import SwitcherThree from "../SelectOption/SwitcherThree";

const UserEdit = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Switcher uchun alohida holatlarni saqlash
  const [switcherState, setSwitcherState] = useState({
    is_seller: false, // Foydalanuvchi turi
    is_active: false, // Holati
  });

  const fullQuery = searchParams?.toString();
  const extractedValue = fullQuery?.split("=")[0]; // Foydalanuvchi id

  // Ma'lumotni yuborish
  const handleSubmit = async () => {
    if (!extractedValue) return;
    try {
      await axiosInstance.put(`/root/customer/${extractedValue}/detail`, {
        is_seller: switcherState.is_seller,
        is_active: switcherState.is_active,
      });
    } catch (error) {
      console.log("Xatolik yuz berdi. Iltimos, qayta urinib ko'ring.");
    }
  };

  // `useEffect` har bir qiymat o'zgarganida yuborishni ta'minlaydi
  useEffect(() => {
    handleSubmit();
  }, [switcherState]);

  // Switcher holatini yangilash funksiyasi
  const handleSwitcherChange = (key: string, value: boolean) => {
    setSwitcherState((prevState) => ({
      ...prevState,
      [key]: value, // Tegishli keyga asoslangan yangilanish
    }));
  };

  return (
    <>
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
          <h3 className="font-medium text-dark dark:text-white">
            Foydalanuvchi Ma&apos;lumotlari
          </h3>
        </div>
        <div className="grid grid-cols-6 gap-5.5 p-6.5">
          <div className="col-span-3">
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              Foydalanuvchi turi
            </label>
            <div className="col-span-1 flex items-center justify-center">
              <SwitcherThree
                id={`toggle-1`}
                isActive={switcherState.is_seller} // Foydalanuvchi turi holati
                onChange={(value: boolean) =>
                  handleSwitcherChange("is_seller", value)
                } // `is_seller` o'zgarganda yangilanish
                text="&nbsp;"
              />
            </div>
          </div>
          <div className="col-span-3">
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              Holati
            </label>
            <SwitcherThree
              id={`toggle-2`}
              isActive={switcherState.is_active} // Holat holati
              onChange={(value: boolean) =>
                handleSwitcherChange("is_active", value)
              } // `is_active` o'zgarganda yangilanish
              text="&nbsp;"
            />
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
    </>
  );
};

export default UserEdit;
