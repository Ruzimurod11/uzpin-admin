"use client";
import DefaultSelectOption from "../SelectOption/DefaultSelectOption";
import SwitcherThree from "../SelectOption/SwitcherThree";

const AddBalansBox = () => {
  return (
    <>
      <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
        <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
          <h3 className="font-medium text-dark dark:text-white">
            Foydalanuvchi Balansini To&apos;ldirish
          </h3>
        </div>
        <div className="grid grid-cols-6 gap-5.5 p-6.5">
          <div className="col-span-6">
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              Pul miqdori
            </label>
            <input
              type="text"
              className="w-full cursor-pointer rounded-[7px] border-[1.5px] border-stroke px-3 py-[9px] outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-stroke file:px-2.5 file:py-1 file:text-body-xs file:font-medium file:text-dark-5 file:focus:border-primary disabled:cursor-default disabled:bg-dark dark:border-dark-3 dark:bg-dark-2 dark:file:border-dark-3 dark:file:bg-white/30 dark:file:text-white"
            />
          </div>

          <div className="col-span-6">
            <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
              Hisob turi
            </label>
            <DefaultSelectOption
              className="w-full cursor-pointer rounded-[7px] border-[1.5px] border-stroke px-3 py-[9px]"
              options={["SUMM", "DOLLOR", "TEXT", "HUMO"]}
            />
          </div>

          <div className="col-span-6">
            <SwitcherThree />
          </div>
          <div className="col-span-6 flex justify-end">
            <button className="flex w-40 justify-center rounded bg-green-400 px-5 py-2 text-white">
              SAQLASH
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddBalansBox;
