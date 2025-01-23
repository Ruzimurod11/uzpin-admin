import React, { useState } from "react";
import axios from "axios";
import axiosInstance from "@/libs/axios";

const CurrencyInput = () => {
  const [usd, setUsd] = useState<string>("");
  const [rub, setRub] = useState<string>("");

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<string>>,
  ) => {
    const value = e.target.value;
    const regex = /^[0-9]*\.?[0-9]*$/;
    if (regex.test(value)) {
      setter(value);
    }
  };

  const handleSubmit = async () => {
    try {
      const data = {
        usd_uzs: parseFloat(usd),
        usd_rub: parseFloat(rub),
      };

      await axiosInstance.post("/root/game/mobile-legands/settings", data);
      alert("Ma'lumot muvaffaqiyatli yuborildi!");
    } catch (error) {
      console.error("Xatolik yuz berdi:", error);
      alert("Ma'lumot yuborishda xatolik yuz berdi.");
    }
  };

  return (
    <div className="col-span-4 grid grid-cols-11 items-center justify-end gap-4">
      <div className="col-span-4">
        <input
          type="text"
          value={usd}
          onChange={(e) => handleInputChange(e, setUsd)}
          className="w-full cursor-pointer rounded-[7px] border-[1.5px] border-stroke px-3 py-[9px] outline-none transition"
          placeholder="SUM"
        />
      </div>
      <div className="col-span-4">
        <input
          type="text"
          value={rub}
          onChange={(e) => handleInputChange(e, setRub)}
          className="w-full cursor-pointer rounded-[7px] border-[1.5px] border-stroke px-3 py-[9px] outline-none transition"
          placeholder="RUB"
        />
      </div>
      <div className="col-span-3">
        <button
          onClick={handleSubmit}
          className="rounded bg-[green] px-3 py-2 text-white"
        >
          Yangilash
        </button>
      </div>
    </div>
  );
};

export default CurrencyInput;
