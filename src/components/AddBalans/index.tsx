"use client";
import { useState } from "react";
import axiosInstance from "@/libs/axios";
import { useRouter, useSearchParams } from "next/navigation";

interface DefaultSelectOptionProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

interface RadioButtonProps {
  options: string[];
  value: string;
  onChange: (value: string) => void;
}

const DefaultSelectOption: React.FC<DefaultSelectOptionProps> = ({
  options,
  value,
  onChange,
}) => {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full cursor-pointer rounded-[7px] border-[1.5px] border-stroke px-3 py-[9px]"
    >
      {options.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
};

const RadioButton: React.FC<RadioButtonProps> = ({
  options,
  value,
  onChange,
}) => {
  return (
    <div className="flex gap-4">
      {options.map((option) => (
        <label key={option} className="flex items-center gap-2">
          <input
            type="radio"
            name="radio"
            value={option}
            checked={value === option}
            onChange={() => onChange(option)}
          />
          {option}
        </label>
      ))}
    </div>
  );
};

const AddBalansBox = () => {
  const [formData, setFormData] = useState({
    type: "PLUS",
    amount: "",
    currency: "UZS",
  });
  const searchParams = useSearchParams();
  const fullQuery = searchParams?.toString();
  const extractedValue = fullQuery?.split("=")[0];

  const router = useRouter();
  const handleInputChange = (field: string, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.amount || Number(formData.amount) <= 0) {
      console.log("Iltimos, pul miqdorini to'g'ri kiriting.");
      return;
    }
    if (!["PLUS", "MINUS"].includes(formData.type)) {
      console.log("Iltimos, 'PLUS' yoki 'MINUS' turini tanlang.");
      return;
    }

    try {
      await axiosInstance.post(
        `/root/customer/${extractedValue}/account`,
        formData,
      );
      router.push("/users/user");
      console.log("Balans muvaffaqiyatli yangilandi!");
    } catch (error) {
      console.log("errorMessage", error);
    }
  };

  return (
    <>
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="flex items-center gap-10 border-b border-stroke px-6.5 py-4 dark:border-dark-3">
          <h3 className="font-medium text-dark dark:text-white">
            Foydalanuvchi Balansini To&apos;ldirish
          </h3>
          <RadioButton
            options={["PLUS", "MINUS"]}
            value={formData.type}
            onChange={(value) => handleInputChange("type", value)}
          />
        </div>
        <div className="grid grid-cols-6 gap-5.5 p-6.5">
          <div className="col-span-6">
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              Pul miqdori
            </label>
            <input
              type="number"
              className="w-full cursor-pointer rounded-[7px] border-[1.5px] border-stroke px-3 py-[9px] outline-none transition"
              value={formData.amount}
              onChange={(e) => handleInputChange("amount", e.target.value)}
              placeholder="1000"
            />
          </div>

          <div className="col-span-6">
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              Hisob turi
            </label>
            <DefaultSelectOption
              options={["UZS", "USD", "RUB"]}
              value={formData.currency}
              onChange={(value) => handleInputChange("currency", value)}
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

export default AddBalansBox;
