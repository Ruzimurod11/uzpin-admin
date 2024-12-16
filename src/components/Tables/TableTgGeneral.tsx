import Image from "next/image";
import { Product } from "../../../types/product";
import { FaEye } from "react-icons/fa6";
import { FiEdit2 } from "react-icons/fi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import Link from "next/link";

const productData = [
  {
    name: "Bot hisob to'ldirish",
    image: "/images/videoplayes.png",
  },
];

const TableTgGeneral = () => {
  return (
    <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-4 md:px-6 2xl:px-7.5">
        <div className="col-span-2 flex items-center">
          {/* <p className="font-medium">Nomi</p> */}
        </div>
        <div className="col-span-1 flex items-center">
          {/* <p className="font-medium">Video</p> */}
        </div>
        {/* <div className="col-span-4 flex items-center">
          <p className="font-medium">Izoh</p>
        </div> */}
        <div className="col-span-1 flex items-center justify-end">
          <Link
            href="/general-info-create"
            className="my-4 flex w-20 justify-center rounded bg-green-400 px-5 py-1 text-2xl text-white"
          >
            +
          </Link>
          {/* <p className="font-medium">ejdbhe</p> */}
        </div>

        <div className="col-span-2 flex items-center">
          <p className="font-medium">Nomi</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Video</p>
        </div>
        {/* <div className="col-span-4 flex items-center">
          <p className="font-medium">Izoh</p>
        </div> */}
        <div className="col-span-1 flex items-center justify-end">
          <p className="font-medium"></p>
        </div>
      </div>

      {productData.map((product, key) => (
        <div
          className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-4 md:px-6 2xl:px-7.5"
          key={key}
        >
          <div className="col-span-2 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                {key + 1}. {product.name}
              </p>
            </div>
          </div>
          <div className="col-span-1 flex items-center">
            <div className="h-12.5 w-15 rounded-md">
              <Image src={product.image} width={60} height={30} alt="Product" />
            </div>
          </div>
          {/* <div className="col-span-4 flex items-center">
            <p className="text-body-sm font-medium text-dark dark:text-dark-6">
              {product.comment}
            </p>
          </div> */}
          <div className="col-span-1 flex cursor-pointer items-center justify-end gap-2">
            <Link
              href={"/general-info-create"}
              className="rounded bg-[orange] px-3 py-1 text-white"
            >
              <FiEdit2 />
            </Link>
            <div className="rounded bg-[red] px-3 py-1 text-white">
              <MdOutlineDeleteOutline />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableTgGeneral;
