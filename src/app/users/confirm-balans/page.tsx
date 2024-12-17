"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import DefaultLayout from "@/components/Layouts/DefaultLaout";
import ConfirmBalansBox from "@/components/ConfirmBalans";
import { useState } from "react";

const ConfirmBalans = () => {
  const [active, setActive] = useState(true);
  return (
    <DefaultLayout>
      {/* <div className="mb-4 flex w-full gap-4 rounded bg-slate-200 px-4 py-2">
        <button
          className={` rounded border border-slate-400 px-4 py-2  ${active && "bg-primary text-white"}`}
          onClick={() => setActive(true)}
        >
          Tasqidlangan Balans
        </button>
        <button
          className={` rounded border border-slate-400 px-4 py-2  ${!active && "bg-primary text-white"}`}
          onClick={() => setActive(false)}
        >
          Bekor Qilingan Balans
        </button>
      </div> */}
      {/* <Breadcrumb
        pageName={active ? "Tasdiqlangan Balans" : "Bekor Qilingan Balans"}
      /> */}
      <ConfirmBalansBox />
    </DefaultLayout>
  );
};

export default ConfirmBalans;
