"use client";
import { useRouter, useSearchParams } from "next/navigation";
import DefaultSelectOption from "../SelectOption/DefaultSelectOption";
import { useState, useEffect } from "react";
import axiosInstance from "@/libs/axios";

const UserEdit = () => {
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    is_active: false,
    is_seller: false,
  });

  const fullQuery = searchParams?.toString();
  const extractedValue = fullQuery?.split("=")[0];
  const router = useRouter();

  const handleOptionChange = (field: any, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    console.log("as", extractedValue);
    console.log(formData);

    // if (extractedValue) {
    //   try {
    //     await axiosInstance.put(
    //       `/root/customer/${extractedValue}/update`,
    //       formData,
    //     );
    //     router.push(`/users/user`);
    //   } catch (error) {
    //     console.error("Error while updating user:", error);
    //   }
    // }
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
              Ism
            </label>
            <input
              type="text"
              className="w-full cursor-pointer rounded-[7px] border-[1.5px] border-stroke px-3 py-[9px] outline-none transition"
              value="Jamshid"
              disabled
            />
          </div>
          <div className="col-span-3">
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              Email
            </label>
            <input
              type="text"
              className="w-full cursor-pointer rounded-[7px] border-[1.5px] border-stroke px-3 py-[9px] outline-none transition"
              value="jamshidqayimov0399@jmail.com"
              disabled
            />
          </div>

          <div className="col-span-3">
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              Foydalanuvchi turi
            </label>
            <DefaultSelectOption
              className="w-full cursor-pointer rounded-[7px] border-[1.5px] border-stroke px-3 py-[9px]"
              options={["Oddiy Mijoz", "Sotuvchi"]}
              onChange={(e: any) =>
                handleOptionChange("is_seller", e === "Sotuvchi")
              }
            />
          </div>
          <div className="col-span-3">
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              Holati
            </label>
            <DefaultSelectOption
              className="w-full cursor-pointer rounded-[7px] border-[1.5px] border-stroke px-3 py-[9px]"
              options={["Faol", "Faol Emas"]}
              onChange={(e: any) =>
                handleOptionChange("is_active", e === "Faol")
              }
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
