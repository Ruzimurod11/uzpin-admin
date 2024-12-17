import Image from "next/image";
import { Product } from "../../../types/product";
import { FaEye } from "react-icons/fa6";
import { FiEdit2 } from "react-icons/fi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import Link from "next/link";

const productData = [
  {
    image: "/images/game.png",
    name: "Apple Watch Series 7",
    category: "Electronics",
    price: 296,
    sold: 22,
    profit: 45,
  },
];

const TableGame = () => {
  return (
    <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="flex items-center justify-between px-4 py-6 md:px-6 xl:px-9">
        <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
          O&apos;yinlar
          {/* Barcha o&apos;yinlar */}
        </h4>
        <Link
          href="games-create"
          className="flex w-20 justify-center rounded bg-green-400 px-5 py-1 text-2xl text-white"
        >
          +
        </Link>
      </div>

      <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-2 flex items-center">
          <p className="font-medium">O&apos;yin nomi</p>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Asosiy Rasm</p>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Banner rasm</p>
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
          className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={key}
        >
          <Link href={`games/${key}`} className="col-span-2 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                {key + 1}. {product.name}
              </p>
            </div>
          </Link>
          <Link href={`games/${key}`} className="col-span-2 flex items-center">
            <div className="h-12.5 w-15 rounded-md">
              <Image src={product.image} width={60} height={50} alt="Product" />
            </div>
          </Link>
          <Link href={`games/${key}`} className="col-span-2 flex items-center">
            <div className="h-12.5 w-15 rounded-md">
              <Image src={product.image} width={60} height={50} alt="Product" />
            </div>
          </Link>
          <Link href={`games/${key}`} className="col-span-1 flex items-center">Faol</Link>
          <div className="col-span-1 flex cursor-pointer items-center justify-end gap-2">
            {/* <div className="rounded bg-blue-600 px-3 py-1 text-white">
              <FaEye />
            </div> */}
            <Link href="games-create">
              <div className="rounded bg-[orange] px-3 py-1 text-white">
                <FiEdit2 size={20} />
              </div>
            </Link>
            <div className="rounded bg-[red] px-3 py-1 text-white">
              <MdOutlineDeleteOutline size={20} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableGame;
