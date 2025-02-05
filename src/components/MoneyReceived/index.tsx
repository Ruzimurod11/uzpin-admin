"use client";

import TableExpenses from "@/components/Tables/TableExpenses";
import TableMoneyRecived from "@/components/Tables/TableMoneyRecived";
import axiosInstance from "@/libs/axios";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { IoLogoUsd } from "react-icons/io5";
import { BiRuble } from "react-icons/bi";

interface MoneyReceived {
  account_uzs: number;
  account_rub: number;
  account_usd: number;
}

interface Statistics {
  uzs: number;
  rub: number;
  usd: number;
}

export default function MoneyReceived() {
  const [active, setActive] = useState(true);
  const searchParams = useSearchParams();

  const fullQuery = searchParams?.toString();
  const extractedValue = fullQuery?.split("=")[0];
  const [formData, setFormData] = useState<MoneyReceived | null>(null);
  const [dataStatistics, setDataStatistics] = useState<Statistics | null>(null);

  useEffect(() => {
    const fetchCardDetails = async () => {
      if (extractedValue) {
        try {
          const response = await axiosInstance.get(
            `/root/customer/${extractedValue}/detail`,
          );

          setFormData(response.data);
        } catch (error) {
          console.error("Failed to fetch card details:", error);
        }
      }
    };

    fetchCardDetails();
  }, [extractedValue]);

  useEffect(() => {
    const fetchCardDetails = async () => {
      if (extractedValue) {
        try {
          const response = await axiosInstance.get(
            `/root/customer/${extractedValue}/transaction/statistics`,
          );

          setDataStatistics(response.data.accepted);
          // console.log(response.data.accepted);
        } catch (error) {
          console.error("Failed to fetch card details:", error);
        }
      }
    };

    fetchCardDetails();
  }, [extractedValue]);

  
  const formatNumber = (num: number) => {
    return num % 1 === 0 ? num.toFixed(0) : num.toFixed(2);
  };
  
  console.log(dataStatistics);
  return (
    <>
      <div className="mb-4 flex w-full justify-between gap-5">
        <div className="flex w-full items-center gap-2 rounded bg-white px-3 py-1 dark:bg-slate-900">
          <div className="rounded bg-[darkgreen] px-2 py-1 text-sm capitalize text-white">
            <IoLogoUsd />
          </div>
          <div className="flex flex-col dark:text-slate-200">
            <div className="flex gap-1">
              <p>Jami:</p>
              <b>
                {dataStatistics?.usd
                  ? formatNumber(dataStatistics?.usd)
                  : "0"}
              </b>
            </div>
            <div className="flex gap-1">
              <p>Hozir:</p>
              <b>
                {formData?.account_usd
                  ? formatNumber(formData?.account_usd)
                  : "0"}
              </b>
            </div>
          </div>
        </div>

        <div className="flex w-full items-center gap-2 rounded bg-white px-3 py-1 dark:bg-slate-900">
          <div className="rounded bg-[darkgreen] px-2 py-1 text-sm capitalize text-white">
            S
          </div>
          <div className="flex flex-col dark:text-slate-200">
            <div className="flex gap-1">
              <p>Jami:</p>
              <b>
                {dataStatistics?.uzs
                  ? formatNumber(dataStatistics?.uzs)
                  : "0"}
              </b>
            </div>
            <div className="flex gap-1">
              <p>Hozir:</p>
              <b>
                {formData?.account_uzs
                  ? formatNumber(formData?.account_uzs)
                  : "0"}
              </b>
            </div>
          </div>
        </div>

        <div className="flex w-full items-center gap-2 rounded bg-white px-3 py-1 dark:bg-slate-900">
          <div className="rounded bg-[darkgreen] px-2 py-1 text-sm capitalize text-white">
            <BiRuble />
          </div>
          <div className="flex flex-col dark:text-slate-200">
            <div className="flex gap-1">
              <p>Jami:</p>
              <b>
                {dataStatistics?.rub
                  ? formatNumber(dataStatistics?.rub)
                  : "0"}
              </b>
            </div>
            <div className="flex gap-1">
              <p>Hozir:</p>
              <b>
                {formData?.account_rub
                  ? formatNumber(formData?.account_rub)
                  : "0"}
              </b>
            </div>
          </div>
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
