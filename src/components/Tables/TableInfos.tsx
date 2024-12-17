import Image from "next/image";
import { Product } from "../../../types/product";
import { FaEye } from "react-icons/fa6";
import { FiEdit2 } from "react-icons/fi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import Link from "next/link";
import CustomCalendar2 from '../Charts/CustomCalendar2'
import DefaultSelectOption from "../SelectOption/DefaultSelectOption";
 
const productData = [
  {
    name: "60 UC",
    count: 123,
    price: 296,
    benefit: 230,
  },
  {
    name: "60 UC",
    count: 123,
    price: 296,
    benefit: 230,
  },
];

const options = ['Uzpin Sayt', "UzpinBot", "SardorBot", "TonyBot", "AnotherBot"];
const games = ['Pubg', "Free Fire"];

const TableInfos = ({ name }: any) => {
  return (
    <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-2 flex items-center justify-center">
          <DefaultSelectOption options={options}/>
        </div>
        <div className="col-span-2 flex items-center justify-center">
          <DefaultSelectOption options={games}/>
        </div>
        <div className="col-span-2 flex items-center justify-center">
        </div>
        <div className="col-span-2 flex gap-2 items-center justify-center">
          Saralash: <CustomCalendar2/>
        </div>
      </div>
      <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-2 flex items-center justify-center">
          <p className="font-medium">{name} </p>
        </div>
        <div className="col-span-2 flex items-center justify-center">
          <p className="font-medium">Sotilganlar soni</p>
        </div>
        <div className="col-span-2 flex items-center justify-center">
          <p className="font-medium">Ummumiy Narxi</p>
        </div>
        <div className="col-span-2 flex items-center justify-center">
          <p className="font-medium">Foyda</p>
        </div>
      </div>

      {productData.map((product, key) => (
        <div
          className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-8 md:px-6 2xl:px-7.5"
          key={key}
        >
          <div className="col-span-2 flex items-center justify-center">
            <div className="flex flex-col justify-center gap-4 sm:flex-row sm:items-center">
              <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                {key + 1}. {product.name}
              </p>
            </div>
          </div>
          <div className="col-span-2 flex items-center justify-center">
            <p className="text-body-sm font-medium text-dark dark:text-dark-6">
              {product.count}
            </p>
          </div>
          <div className="col-span-2 flex items-center justify-center">
            <p className="text-body-sm font-medium text-dark dark:text-dark-6">
              {product.price}
            </p>
          </div>

          <div className="col-span-2 flex items-center justify-center">
            <p className="text-body-sm font-medium text-dark dark:text-dark-6">
              {product.benefit}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableInfos;
