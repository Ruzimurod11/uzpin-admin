import Image from "next/image";
import { Product } from "../../../types/product";
import { FaEye } from "react-icons/fa6";
import { FiEdit2 } from "react-icons/fi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import Link from "next/link";
import SearchForm from "../Header/SearchForm";

const productData = [
  {
    name: "💵 325 UC",
    userName: "santauc@gmail.com",
    amout: 10,
    price: 3.9,
    allPrice: 39,
    valyuta: "USD",
    salesType: "Uzpinidbot",
    create_at: "07.12.2024 07:57",
  },
  {
    name: "💵 25 UC",
    userName: "santauc@gmail.com",
    amout: 10,
    price: 3.9,
    allPrice: 39,
    valyuta: "USD",
    salesType: "Uzpinidbot",
    create_at: "07.12.2024 07:57",
  },
];

const TableSalesPromoBox = () => {
  return (
    <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="flex items-center justify-between px-4 py-6 md:px-6 xl:px-9">
        <h4 className="text-body-2xlg font-bold text-dark dark:text-white">
          Sotilgan promokodlar
        </h4>
        <SearchForm/>
      </div>

      <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-9 md:px-6 2xl:px-7.5">
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Promokod</p>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Foydalanuvchi nomi</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Miqdori</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Narxi</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Ummumiy Narxi</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Pul birligi</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Sotuv turi</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Yaratilgan sana</p>
        </div>
      </div>

      {productData.map((product, key) => (
        <div
          className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-9 md:px-6 2xl:px-7.5"
          key={key}
        >
          <div className="col-span-1 flex items-center">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                {key + 1}. {product.name}
              </p>
            </div>
          </div>
          <div className="col-span-2 flex items-center">
            <p className="text-body-sm font-medium text-dark dark:text-dark-6">
              {product.userName}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-body-sm font-medium text-dark dark:text-dark-6">
              {product.amout}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-body-sm font-medium text-dark dark:text-dark-6">
              {product.price}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-body-sm font-medium text-dark dark:text-dark-6">
              {product.allPrice}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-body-sm font-medium text-dark dark:text-dark-6">
              {product.valyuta}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-body-sm font-medium text-dark dark:text-dark-6">
              {product.salesType}
            </p>
          </div>
          <div className="col-span-1 flex items-center">
            <p className="text-body-sm font-medium text-dark dark:text-dark-6">
              {product.create_at}
            </p>
          </div>
          {/* <div className="col-span-1 flex cursor-pointer items-center gap-2">
            <div className="rounded bg-blue-600 px-3 py-1 text-white">
              <FaEye />
            </div>
            <Link href="games-create">
              <div className="rounded bg-[orange] px-3 py-1 text-white">
                <FiEdit2 />
              </div>
            </Link>
            <div className="rounded bg-[red] px-3 py-1 text-white">
              <MdOutlineDeleteOutline />
            </div>
          </div> */}
        </div>
      ))}
    </div>
  );
};

export default TableSalesPromoBox;
