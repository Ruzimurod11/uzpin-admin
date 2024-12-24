"use client";

import TableExpenses from "@/components/Tables/TableExpenses";
import TableMoneyRecived from "@/components/Tables/TableMoneyRecived";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { MdOutlineAttachMoney } from "react-icons/md";

export default function MoneyReceived() {
  const [active, setActive] = useState(true);
  const searchParams = useSearchParams();

  const fullQuery = searchParams?.toString();
  const extractedValue = fullQuery?.split("=")[0];
  return (
    <>
      <div className="mb-4 flex w-full justify-end gap-4 rounded px-4 py-2">
        <button
          className={`rounded border border-slate-400 px-4 py-2 ${
            active ? "bg-primary text-white" : "dark:text-slate-200"
          }`}
          onClick={() => setActive(true)}
        >
          Tushgan Pullar
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
      <div className="mb-4 flex w-full justify-between gap-5">
        <div className="flex w-full items-center gap-2 rounded bg-white px-3 py-4 dark:bg-slate-900">
          <div className="rounded bg-[darkgreen] px-4 py-1 text-lg text-white">
            <MdOutlineAttachMoney />
          </div>
          <p className="dark:text-slate-200">
            Hozirgi hisob so&apos;mda: <b>123 313</b>
          </p>
        </div>
        <div className="flex w-full items-center gap-2 rounded bg-white px-3 py-4 dark:bg-slate-900">
          <div className="rounded bg-[darkgreen] px-4 py-1 text-lg text-white">
            <MdOutlineAttachMoney />
          </div>
          <p className="dark:text-slate-200">
            Hozirgi hisob dollorda: <b>1.13</b>
          </p>
        </div>
        <div className="flex w-full items-center gap-2 rounded bg-white px-3 py-4 dark:bg-slate-900">
          <div className="rounded bg-[darkgreen] px-4 py-1 text-lg text-white">
            <MdOutlineAttachMoney />
          </div>
          <p className="dark:text-slate-200">
            Hozirgi hisob rublda: <b>1.13</b>
          </p>
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
