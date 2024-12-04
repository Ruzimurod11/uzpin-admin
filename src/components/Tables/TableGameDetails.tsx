import Image from "next/image";
import { Product } from "../../../types/product";
import { FaEye, FaFileArrowUp } from "react-icons/fa6";
import { FiEdit2 } from "react-icons/fi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import Link from "next/link";

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
        <div className="col-span-2 flex items-center">
          <p className="font-medium"></p>
        </div>
      </div>

      {productData.map((product, key) => (
        <div
          className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-12 md:px-6 2xl:px-7.5"
          key={key}
        >
          <Link href={`${key}/${key}`} className="col-span-2 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                {key + 1}. {product.name}
              </p>
            </div>
          </Link>

          <div className="col-span-2 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                {product.sold}
              </p>
            </div>
          </div>
          <div className="col-span-2 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                {product.nosold}
              </p>
            </div>
          </div>
          <div className="col-span-2 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                {product.priceUZS}
              </p>
            </div>
          </div>
          <div className="col-span-2 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                {product.priceUSD}
              </p>
            </div>
          </div>

          <div className="col-span-2 flex cursor-pointer items-center gap-2">
            <div className="rounded bg-blue-600 px-3 py-1 text-white">
              <FaEye />
            </div>
            <Link href="promo-create">
              <div className="rounded bg-[orange] px-3 py-1 text-white">
                <FiEdit2 />
              </div>
            </Link>
            <div className="rounded bg-[green] px-3 py-1 text-white">
              <FaFileArrowUp />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableGameDetails;
