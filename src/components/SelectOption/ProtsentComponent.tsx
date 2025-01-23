import { useState } from "react";
import SwitcherThree from "./SwitcherThree";
import axiosInstance from "@/libs/axios";

const YourComponent = ({
  products,
}: {
  products: { id: string; percent: string; isSeller: boolean }[];
}) => {
  // Holatni alohida saqlash uchun massiv
  const [localStates, setLocalStates] = useState(
    products.map((product) => ({
      percent: product.percent,
      isSeller: product.isSeller,
    })),
  );

  // Input o'zgarishini qayta ishlash
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number,
    productId: string,
  ) => {
    const value = e.target.value;
    const regex = /^[0-9]*\.?[0-9]*$/;

    if (regex.test(value)) {
      setLocalStates((prevStates) => {
        const newStates = [...prevStates];
        newStates[index].percent = value; // faqat tegishli elementning protsentini yangilash
        return newStates;
      });

      sendDataToBackend(value, productId); // backendga yuborish
    }
  };

  // Switch holatini o'zgartirish
  const handleSwitchChange = (
    index: number,
    value: boolean,
    productId: string,
  ) => {
    setLocalStates((prevStates) => {
      const newStates = [...prevStates];
      newStates[index].isSeller = value; // faqat tegishli elementning isSellerini yangilash
      return newStates;
    });

    sendDataToBackend(localStates[index].percent, productId); // backendga yuborish
  };

  // Backendga ma'lumot yuborish
  const sendDataToBackend = (percent: string, productId: string) => {
    const data = {
      percent: parseFloat(percent),
      is_partner:
        localStates.find((state) => state.percent === percent)?.isSeller ||
        false,
    };

    axiosInstance
      .post(`/root/game/mobile-legands/update/percent/${productId}`, data)
      .then((response) => {
        console.log("Backenddan javob:", response.data);
      })
      .catch((error) => {
        console.error("Xatolik:", error);
      });
  };

  return (
    <div>
      {products.map((product, index) => (
        <div key={product.id} className="col-span-2 flex">
          <input
            type="text"
            value={localStates[index].percent} // localStates dan tegishli elementni olamiz
            onChange={(e) => handleInputChange(e, index, product.id)} // indexni uzatish
            className="w-full cursor-pointer rounded-[7px] border-[1.5px] border-stroke px-3 py-[9px] outline-none transition"
            placeholder={
              localStates[index].isSeller ? "Oddiy Mijoz" : "Sotuvchi"
            } // placeholder isSeller ga qarab o'zgaradi
          />
          <SwitcherThree
            isActive={localStates[index].isSeller} // localStates dan tegishli holatni olamiz
            onChange={(value: boolean) =>
              handleSwitchChange(index, value, product.id)
            } // indexni uzatish
            text="&nbsp;"
          />
        </div>
      ))}
    </div>
  );
};

export default YourComponent;
