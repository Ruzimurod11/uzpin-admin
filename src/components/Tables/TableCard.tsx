import Image from "next/image";
import { Product } from "../../../types/product";
import { FaEye } from "react-icons/fa6";
import { FiEdit2 } from "react-icons/fi";
import { MdOutlineDeleteOutline } from "react-icons/md";

const productData = [
  {
    image: "/images/game.png",
    name: "HUMO",
    number: 9860170112522017,
    name2: "Sherzodjon Akramov",
    type: "SUM",
    active: "faol",
  },
];

const TableCard = () => {
  return (
    <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="px-4 py-6 md:px-6 xl:px-9">
        <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
          Karta Malumotlari
        </h4>
      </div>

      <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-7 md:px-6 2xl:px-7.5">
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Karta rasmi</p>
        </div>
        <div className="col-span-1 hidden items-center sm:flex">
          <p className="font-medium">Karta nomi</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Karta raqami</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Karta egasi</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Karta turi</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Holati</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium"></p>
        </div>
      </div>

      {productData.map((product, key) => (
        <div
          className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-7 md:px-6 2xl:px-7.5"
          key={key}
        >
          <div className="col-span-1 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                {key + 1}.{" "}
              </p>
              <div className="h-12.5 w-15 rounded-md">
                <Image
                  src={product.image}
                  width={60}
                  height={50}
                  alt="Product"
                />
              </div>
            </div>
          </div>
          <div className="col-span-1 hidden items-center sm:flex">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                {product.name}
              </p>
            </div>
          </div>
          <div className="col-span-1 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                {product.number}
              </p>
            </div>
          </div>
          <div className="col-span-1 hidden items-center sm:flex">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                {product.name2}
              </p>
            </div>
          </div>
          <div className="col-span-1 hidden items-center sm:flex">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                {product.type}
              </p>
            </div>
          </div>
          <div className="col-span-1 hidden items-center sm:flex">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                {product.active}
              </p>
            </div>
          </div>
          <div className="col-span-1 flex cursor-pointer items-center gap-2">
            <div className="rounded bg-blue-600 px-3 py-1 text-white">
              <FaEye />
            </div>
            <div className="rounded bg-[orange] px-3 py-1 text-white">
              <FiEdit2 />
            </div>
            <div className="rounded bg-[red] px-3 py-1 text-white">
              <MdOutlineDeleteOutline />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableCard;
