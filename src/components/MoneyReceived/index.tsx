"use client";

import TableExpenses from "@/components/Tables/TableExpenses";
import TableMoneyRecived from "@/components/Tables/TableMoneyRecived";
import axiosInstance from "@/libs/axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { MdOutlineAttachMoney } from "react-icons/md";

interface MoneyReceived {
  account_uzs: number;
  account_rub: number;
  account_usd: number;
}

export default function MoneyReceived() {
  const [active, setActive] = useState(true);
  const searchParams = useSearchParams();

  const fullQuery = searchParams?.toString();
  const extractedValue = fullQuery?.split("=")[0];
  const [formData, setFormData] = useState<MoneyReceived | null>(null);

  useEffect(() => {
    const fetchCardDetails = async () => {
      if (extractedValue) {
        try {
          const response = await axiosInstance.get(
            `/root/customer/${extractedValue}/detail`,
          );

          setFormData(response.data);
          console.log(response.data);
        } catch (error) {
          console.error("Failed to fetch card details:", error);
        }
      }
    };

    fetchCardDetails();
  }, [extractedValue]);

  return (
    <>
      {/* <div className="mb-4 flex w-full justify-end gap-4 rounded px-4 py-2">
        <button
          className={`rounded border border-slate-400 px-4 py-2 ${
            active ? "bg-primary text-white" : "dark:text-slate-200"
          }`}
          onClick={() => setActive(true)}
        >
          Tushum
        </button>
        <button
          className={`rounded border border-slate-400 px-4 py-2 ${
            !active ? "bg-primary text-white" : "dark:text-slate-200"
          }`}
          onClick={() => setActive(false)}
        >
          Xarajatlar
        </button>
      </div> */}
      <div className="mb-4 flex w-full justify-between gap-5">
        <div className="flex w-full items-center gap-2 rounded bg-white px-3 py-4 dark:bg-slate-900">
          <div className="rounded bg-[darkgreen] px-4 py-1 text-sm capitalize text-white">
            Dollor
          </div>
          <p className="dark:text-slate-200">
            <b>{formData?.account_usd ?? "0"}</b>
          </p>
        </div>
        <div className="flex w-full items-center gap-2 rounded bg-white px-3 py-4 dark:bg-slate-900">
          <div className="rounded bg-[darkgreen] px-4 py-1 text-sm capitalize text-white">
            Sum
          </div>
          <p className="dark:text-slate-200">
            <b>{formData?.account_uzs ?? "0"}</b>
          </p>
        </div>

        <div className="flex w-full items-center gap-2 rounded bg-white px-3 py-4 dark:bg-slate-900">
          <div className="rounded bg-[darkgreen] px-4 py-1 text-sm capitalize text-white">
            Ruble
          </div>
          <p className="dark:text-slate-200">
            <b>{formData?.account_rub ?? "0"}</b>
          </p>
        </div>
        <div className="flex w-max justify-end gap-4 rounded py-2">
          <button
            className={`rounded border border-slate-400 px-4 py-2 ${
              active ? "bg-primary text-white" : "dark:text-slate-200"
            }`}
            onClick={() => setActive(true)}
          >
            Tushum
          </button>
          <button
            className={`rounded border border-slate-400 px-4 py-2 ${
              !active ? "bg-primary text-white" : "dark:text-slate-200"
            }`}
            onClick={() => setActive(false)}
          >
            Xarajatlar
          </button>
        </div>
      </div>
      {active ? (
        <TableMoneyRecived id={extractedValue} />
      ) : (
        <TableExpenses id={extractedValue} />
      )}
    </>
  );
}
