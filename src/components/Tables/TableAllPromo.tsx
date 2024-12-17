'use client'
import Image from "next/image";
import { Product } from "../../../types/product";
import { FaEye, FaFileArrowUp } from "react-icons/fa6";
import { FiEdit2 } from "react-icons/fi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaArrowLeft } from "react-icons/fa";
import {useRouter} from 'next/navigation'

const productData = [
  {
    name: "60 UC",
    code: "U0hqUUVXQUMydTIzTjk2c0xz",
    create_at: "09.03.2023 04:35",
    active: "Sotilgan",
  },
  {
    name: "60 UC",
    code: "U0hqUUVXQUMydTIzTjk2c0xz",
    create_at: "09.03.2023 04:35",
    active: "Sotilgan",
  },
];

const TableAllPromo = () => {
  const router = useRouter()

  const goBack = () => {
    router.back()
  }
  return (
    <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="grid grid-cols-11 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-11 md:px-6 2xl:px-7.5">
        <div onClick={goBack} className="col-span-2 flex gap-4 cursor-pointer items-center">
          <FaArrowLeft/>
          <p className="font-medium">60 UC</p>
        </div>
        <div className="col-span-4 flex items-center">
          <p className="font-medium">Promokod</p>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Yaratilgan sana</p>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Holati</p>
        </div>
        <div className="col-span-1 flex items-center justify-end">
          <div className="rounded bg-[red] px-3 py-1 text-white">
            <MdOutlineDeleteOutline />
          </div>
        </div>
      </div>

      {productData.map((product, key) => (
        <div
          className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-11 md:px-6 2xl:px-7.5"
          key={key}
        >
          <div className="col-span-2 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <input type="checkbox" />
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                {key + 1}. {product.name}
              </p>
            </div>
          </div>

          <div className="col-span-4 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                {product.code}
              </p>
            </div>
          </div>
          <div className="col-span-2 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                {product.create_at}
              </p>
            </div>
          </div>
          <div className="col-span-2 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                {product.active}
              </p>
            </div>
          </div>
          <div className="col-span-1 flex cursor-pointer items-center gap-2">
            {/* <div className="rounded bg-blue-600 px-3 py-1 text-white">
              <FaEye />
            </div>
            <Link href="promo-create">
              <div className="rounded bg-[orange] px-3 py-1 text-white">
                <FiEdit2 />
              </div>
            </Link> */}
            {/* <div className="rounded bg-[red] px-3 py-1 text-white">
              <MdOutlineDeleteOutline />
            </div> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableAllPromo;
