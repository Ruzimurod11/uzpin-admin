import React, { useEffect, useState } from "react";
import axios from "axios";
import axiosInstance from "@/libs/axios";
import { toast } from "react-toastify";

const CurrencyInput = ({ setReload }: any) => {
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
      toast.success("Narxlar muvaffaqiyatli yangilandi!");
      setReload((prev: boolean) => !prev);
    } catch (error) {
      console.error("Xatolik yuz berdi:", error);
      toast.error("Ma'lumot yuborishda xatolik yuz berdi.");
    }
  };

  const GetValyuta = async () => {
    try {
      const response = await axiosInstance.get(
        "/root/game/mobile-legands/settings",
      );
      setUsd(response.data.usd_uzs.toString());
      setRub(response.data.usd_rub.toString());
    } catch (error) {
      console.error("Xatolik yuz berdi:", error);
    }
  };

  useEffect(() => {
    GetValyuta();
  }, []);

  return (
    <div className="flex items-center justify-end gap-4 px-8">
      <div className="col-span-4 flex items-center gap-3 text-nowrap">
        <label htmlFor="usd" className="text-lg font-bold">
          1$ - sumda:
        </label>
        <input
          type="text"
          name="usd"
          value={usd}
          onChange={(e) => handleInputChange(e, setUsd)}
          className="w-full cursor-pointer rounded-[7px] border-[1.5px] border-stroke px-3 py-[9px] outline-none transition"
          placeholder="SUM"
        />
      </div>
      <div className="col-span-4  flex items-center gap-3 text-nowrap">
        <label htmlFor="rubl" className="text-lg font-bold">
          1$ - rublda:
        </label>
        <input
          type="text"
          name="rubl"
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
          Saqlash
        </button>
      </div>
    </div>
  );
};

export default CurrencyInput;
