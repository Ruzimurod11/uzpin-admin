import React, { useState } from "react";
import ClickOutside from "@/components/ClickOutside";
import { IoIosArrowDown } from "react-icons/io";

const DefaultSelectOption = ({ options }: any) => {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);
  };

  return (
    <ClickOutside onClick={() => setIsOpen(false)}>
      <div className="relative z-20 inline-flex w-full cursor-pointer appearance-none rounded-[5px] border border-stroke bg-white text-sm font-medium outline-none dark:border-dark-3 dark:bg-dark-2">
        <div
          className={`w-full py-[9px] pl-[9px] pr-[35px] text-sm font-medium text-dark dark:text-white ${isOpen ? "open" : ""}`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {selectedOption}
          <span
            className={`absolute right-2.5 top-1/2 z-10 -translate-y-1/2 ${isOpen && "rotate-180"}`}
          >
            <IoIosArrowDown />
          </span>
        </div>
        {isOpen && (
          <div className="absolute right-0 top-full z-40 mt-2 w-full rounded-[7px] border border-stroke bg-white py-1.5 shadow-2 dark:border-dark-3 dark:bg-dark-2 dark:shadow-card">
            <ul>
              {options.map((option: string, index: number) => (
                <li
                  key={index}
                  onClick={() => handleOptionSelect(option)}
                  className={`flex w-full cursor-pointer items-center gap-2 rounded-lg px-2.5 py-1.5 text-left font-medium hover:text-dark dark:hover:text-white ${selectedOption === option ? "selected" : ""}`}
                >
                  {option}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </ClickOutside>
  );
};

export default DefaultSelectOption;
