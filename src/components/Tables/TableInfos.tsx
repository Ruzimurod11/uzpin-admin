import Image from "next/image";
import { Product } from "../../../types/product";
import { FaEye } from "react-icons/fa6";
import { FiEdit2 } from "react-icons/fi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import Link from "next/link";

const productData = [
  {
    name: "60 UC",
    count: 123,
    price: 296,
  },
  {
    name: "60 UC",
    count: 123,
    price: 296,
  },
  {
    name: "60 UC",
    count: 123,
    price: 296,
  },
  {
    name: "60 UC",
    count: 123,
    price: 296,
  },
];

const TableInfos = () => {
  return (
    <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-6 md:px-6 2xl:px-7.5">
        <div className="col-span-2 flex items-center">
          <p className="font-medium">O&apos;yin nomi</p>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Sotilganlar soni</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Ummumiy Narxi</p>
        </div>
      </div>

      {productData.map((product, key) => (
        <div
          className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-6 md:px-6 2xl:px-7.5"
          key={key}
        >
          <div className="col-span-2 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                {key + 1}. {product.name}
              </p>
            </div>
          </div>
          <div className="col-span-2 flex items-center">
            <p className="text-body-sm font-medium text-dark dark:text-dark-6">
              {product.count}
            </p>
          </div>
          <div className="col-span-2 flex items-center">
            <p className="text-body-sm font-medium text-dark dark:text-dark-6">
              {product.price}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableInfos;
