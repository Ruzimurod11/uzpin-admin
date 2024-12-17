"use client";
import { FaEye, FaFileArrowUp } from "react-icons/fa6";
import { FiEdit2 } from "react-icons/fi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import Link from "next/link";
import { useState } from "react";

const productData = [
  {
    name: "60 UC",
    sold: "639",
    nosold: 123433,
    priceUZS: 296,
    priceUSD: 0.85,
  },
];

const TableGameDetails = () => {
  const [modal, setModal] = useState(false);
  return (
    <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="grid grid-cols-11 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-12 md:px-6 2xl:px-7.5">
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Promokod nomi</p>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Sotilmagan</p>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Sotilgan</p>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Narx UZS</p>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Narx USD</p>
        </div>
        <div className="col-span-2 flex items-center justify-end">
          <Link
            href="promo-create"
            className="flex w-20 justify-center rounded bg-green-400 px-5 py-1 text-2xl text-white"
          >
            +
          </Link>
          {/* <p className="font-medium"></p> */}
        </div>
      </div>

      {productData.map((product, key) => (
        <div
          className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-12 md:px-6 2xl:px-7.5"
          key={key}
        >
          <Link href={`${key}/${key}`} className="col-span-2 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-body-sm font-bold text-black underline dark:text-dark-8">
                {key + 1}. {product.name}
              </p>
            </div>
          </Link>

          <Link href={`${key}/${key}`} className="col-span-2 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                {product.sold}
              </p>
            </div>
          </Link>
          <Link href={`${key}/${key}`} className="col-span-2 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                {product.nosold}
              </p>
            </div>
          </Link>
          <Link href={`${key}/${key}`} className="col-span-2 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                {product.priceUZS}
              </p>
            </div>
          </Link>
          <Link href={`${key}/${key}`} className="col-span-2 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                {product.priceUSD}
              </p>
            </div>
          </Link>

          <div className="col-span-2 flex cursor-pointer items-center justify-end gap-2">
            <Link href="promo-create">
              <div className="rounded bg-[orange] px-3 py-1 text-white">
                <FiEdit2 />
              </div>
            </Link>
            <div
              onClick={() => setModal(true)}
              className="rounded bg-[green] px-3 py-1 text-white"
            >
              <FaFileArrowUp />
            </div>
            <div className="rounded bg-[red] px-3 py-1 text-white">
              <MdOutlineDeleteOutline />
            </div>
          </div>
        </div>
      ))}

      {modal && (
        <div className="z-5000 absolute left-[50%] top-[50%] flex h-[500px] w-[800px] translate-x-[-50%] translate-y-[-50%] flex-col rounded-lg bg-white px-4 py-4 shadow-2xl dark:bg-gray-dark dark:shadow-card">
          <div className="mb-3 flex items-center justify-between">
            <label className="block text-body-sm font-medium text-dark dark:text-white">
              Promokod qo&apos;shish
            </label>
            <button className="text-sm" onClick={() => setModal(false)}>
              ❌
            </button>
          </div>
          <textarea className="w-full flex-grow resize-none rounded-[7px] border-[1.5px] border-stroke px-3 py-[9px] outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-stroke file:px-2.5 file:py-1 file:text-body-xs file:font-medium file:text-dark-5 focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-dark dark:border-dark-3 dark:bg-dark-2 dark:file:border-dark-3 dark:file:bg-white/30 dark:file:text-white" />
          <div className="mt-4 flex justify-end">
            <button className="rounded bg-green-900 px-4 py-2 text-white">
              Qo&apos;shish
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableGameDetails;
