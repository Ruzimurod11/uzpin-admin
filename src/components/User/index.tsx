"use client";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Link from "next/link";
import TableUser from "@/components/Tables/TableUser";
import { useState } from "react";
const User = () => {
  const [active, setActive] = useState(true);
  return (
    <>
      <div className="mb-4 flex w-full gap-4 rounded bg-slate-200 px-4 py-2 dark:bg-slate-900">
        <button
          className={` rounded border border-slate-400 px-4 py-2  ${active && "bg-yellow-700 text-white"}`}
          onClick={() => setActive(true)}
        >
          SUM
        </button>
        <button
          className={` rounded border border-slate-400 px-4 py-2  ${!active && "bg-yellow-700 text-white"}`}
          onClick={() => setActive(false)}
        >
          DOLLOR
        </button>
      </div>

      <Breadcrumb pageName="Foydalanuvchilar" />
      <TableUser />
      {/* <div className="flex justify-end">
        <Link
          href="games-create"
          className="my-4 flex w-20 justify-center rounded bg-green-400 px-5 py-1 text-2xl text-white"
        >
          +
        </Link>
      </div> */}
    </>
  );
};

export default User;
