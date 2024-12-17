"use client";
import { useState } from "react";

const RadioButton = () => {
  const [activeBot, setActiveBot] = useState<string | null>(null);
  return (
    <div>
      <div className="flex items-center space-x-6">
        {["Kirim", "Chiqim"].map(
          (botName, index) => (
            <button
              key={index}
              className={`h-[40px] text-nowrap rounded-[5px] border px-6 ${
                activeBot === botName
                  ? "border-primary bg-primary text-white"
                  : "border-primary text-primary"
              }`}
              onClick={() => setActiveBot(botName)}
            >
              {botName}
            </button>
          ),
        )}
      </div>
    </div>
  );
};

export default RadioButton;
