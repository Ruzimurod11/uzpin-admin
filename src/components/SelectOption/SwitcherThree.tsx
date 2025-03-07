import { useState, useEffect } from "react";
import { IoMdCheckmark } from "react-icons/io";
import { MdOutlineClose } from "react-icons/md";

type SwitcherThreeProps = {
  isActive: boolean;
  onChange: (value: boolean) => void;
  text?: string;
  id?: string;
};

const SwitcherThree: React.FC<SwitcherThreeProps> = ({
  isActive,
  onChange,
  text,
  id,
}) => {
  const [enabled, setEnabled] = useState(isActive);

  // isActive qiymati o'zgarganda enabled holatini yangilash
  useEffect(() => {
    setEnabled(isActive);
  }, [isActive]);

  const handleToggle = () => {
    const newValue = !enabled;
    setEnabled(newValue);
    onChange(newValue);
  };

  return (
    <div>
      <label
        htmlFor={id}
        className="flex cursor-pointer select-none items-center text-lg"
      >
        {text ? text : "Holati"} &nbsp;&nbsp;
        <div className="relative">
          <input
            type="checkbox"
            id={id}
            className="sr-only"
            checked={enabled}
            onChange={handleToggle}
          />
          <div className="block h-8 w-14 rounded-full bg-gray-300 dark:bg-[#5A616B]"></div>
          <div
            className={`dot absolute left-1 top-1 flex h-6 w-6 items-center justify-center rounded-full bg-white shadow-switch-1 transition dark:bg-red ${
              enabled && "!right-1 !translate-x-full !bg-primary dark:!bg-green"
            }`}
          >
            {enabled ? (
              <IoMdCheckmark className="fill-white dark:fill-dark" />
            ) : (
              <MdOutlineClose />
            )}
          </div>
        </div>
      </label>
    </div>
  );
};

export default SwitcherThree;
