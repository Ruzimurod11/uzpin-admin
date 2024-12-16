import Image from "next/image";
import Link from "next/link";
import { BiTransfer } from "react-icons/bi";
import { CiDollar } from "react-icons/ci";
import { FaEye } from "react-icons/fa6";
import { FiEdit2 } from "react-icons/fi";
import { MdOutlineDeleteOutline } from "react-icons/md";

const productData = [
  {
    name: "Jamshid",
    botToken: "324bjkbfkwebr234k234adfr23f",
    bannerUz: "/images/cardhumo.jpg",
    bannerRu: "/images/cardhumo.jpg",
    bannerEn: "/images/cardhumo.jpg",
  },
];

const TablePartner = () => {
  return (
    <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="flex items-center justify-between px-4 py-6 md:px-6 xl:px-9">
        <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
          Barcha Hamkorlar
        </h4>
        <Link
          href="/partnor-create"
          className="flex w-20 justify-center rounded bg-green-400 px-5 py-1 text-2xl text-white"
        >
          +
        </Link>
      </div>

      <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-6 md:px-6 2xl:px-7.5">
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Nomi</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Bot Nomi</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Banner Uz</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Banner Ru</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Banner En</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium"></p>
        </div>
      </div>

      {productData.map((product, key) => (
        <div
          className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-6 md:px-6 2xl:px-7.5"
          key={key}
        >
          <div className="col-span-1 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                {key + 1}. {product.name}
              </p>
            </div>
          </div>
          <div className="col-span-1 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                {/* {product.botToken} */}
                TESTBOT
              </p>
            </div>
          </div>
          <div className="col-span-1 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="h-12.5 w-15 rounded-md">
                <Image
                  src={product.bannerUz}
                  width={60}
                  height={50}
                  alt="Product"
                />
              </div>
            </div>
          </div>
          <div className="col-span-1 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="h-12.5 w-15 rounded-md">
                <Image
                  src={product.bannerRu}
                  width={60}
                  height={50}
                  alt="Product"
                />
              </div>
            </div>
          </div>
          <div className="col-span-1 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <div className="h-12.5 w-15 rounded-md">
                <Image
                  src={product.bannerEn}
                  width={60}
                  height={50}
                  alt="Product"
                />
              </div>
            </div>
          </div>

          <div className="col-span-1 flex cursor-pointer items-center justify-end gap-2">
            <Link
              href={"/partnor-create"}
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

export default TablePartner;
