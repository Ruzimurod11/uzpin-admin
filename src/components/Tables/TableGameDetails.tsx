"use client";
import { FaEye, FaFileArrowUp } from "react-icons/fa6";
import { FiEdit2 } from "react-icons/fi";
import { MdOutlineDeleteOutline } from "react-icons/md";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { FaArrowLeft } from "react-icons/fa";
import axiosInstance from "@/libs/axios";
import Loader from "../common/Loader";
import ConfirmDeleteModal from "../ConfirmDeleteModal";
import { toast } from "react-toastify";
import CurrencyInput from "../SelectOption/CurrencyInput";
import SwitcherThree from "../SelectOption/SwitcherThree";
import { IoLogoUsd } from "react-icons/io5";
import { BiRuble } from "react-icons/bi";
import Pagination from "../Pagination";

interface Game {
  id: string;
  name: string;
  promocode_values: any;
  customer_price_uzs: number;
  customer_price_usd: number;
  customer_price_rub: number;
  body_price_usd: number;
  body_price_uzs: number;
  body_price_rub: number;
  partner_price_uzs: number;
  partner_price_usd: number;
  partner_price_rub: number;
  partner_percent: number;
  percent: number;
  is_active: boolean;
}
const TableGameDetails = () => {
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  let pathname = usePathname();
  let id = pathname ? pathname.split("/").pop()?.replace("%7D", "") : "";

  const [data, setData] = useState<Game[]>([]);
  const [data1, setData1] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState("");
  const [isSellerState, setIsSellerState] = useState<Record<string, boolean>>(
    {},
  );

  const [reload, setReload] = useState<Boolean>(false);

  const [protsent, setProtsent] = useState<Record<string, string>>({});
  const [protsentSeller, setProtsentSeller] = useState<Record<string, string>>(
    {},
  );

  const fetchStats = async (page: number) => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `/root/game/promocodes/${id}?page=${page} `,
      );
      setData(response.data.results || []);
      setTotalPages(Math.ceil(response.data.count / 10));
    } catch (error) {
      console.error("Ma'lumotlarni yuklashda xatolik:", error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchStats(currentPage);
  }, [reload, currentPage]);

  const router = useRouter();
  const goBack = () => {
    router.back();
  };

  const DeleteGame = (id: any) => {
    setIsModalOpen(id);
  };

  const handleDelete = async (gameId: string) => {
    try {
      await axiosInstance.delete(`/root/game/promocodes/${gameId}/detail`);
      setData((prevData) => prevData.filter((game) => game.id !== gameId));
      setIsModalOpen("");
      toast.warn("Muvaffaqiyatli O'chirildi");
    } catch (error) {
      toast.error("O'yinni o'chirishda xatolik");
    }
  };

  const [promocodetext, setPromocode] = useState("");

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = e.target.value;

    const lines = inputText.split("\n");
    const cleanedText = lines.reduce((acc: string[], line, index) => {
      if (line.trim() === "" && acc[acc.length - 1]?.trim() === "") {
        return acc;
      }
      return [...acc, line];
    }, []);

    setPromocode(cleanedText.join("\n"));
  };

  const PromoCreateValue = async (productId: any) => {
    const payload = {
      text: promocodetext,
      promocode: productId,
    };
    try {
      const response = await axiosInstance.post(
        "/root/game/promocodevalues/create",
        payload,
      );
      if (response.data.values.length === 0) {
        setModal(false);
        toast.success("Promokod muvaffaqiyatli qo'shildi");
        router.push(`/games/0/${productId}`);
      } else {
        toast.success("Promokod muvaffaqiyatli qo'shildi");
        setModal(false);
        setPromocode("");
        setData1((prevState: any) => [
          ...(prevState || []),
          ...response.data.values,
        ]);
        setModal1(true);
      }
    } catch (error) {
      toast.error("Promokodni yuborishda xatolik");
    }
  };

  const closeModal1 = () => {
    setModal1(false);
    setData1([]);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    productId: string,
  ) => {
    const value = e.target.value;
    const regex = /^[0-9]*\.?[0-9]*$/;

    if (regex.test(value)) {
      setProtsent((prev) => ({
        ...prev,
        [productId]: value,
      }));
    }
  };

  const handleInputChangeSeller = (
    e: React.ChangeEvent<HTMLInputElement>,
    productId: string,
  ) => {
    const value = e.target.value;
    const regex = /^[0-9]*\.?[0-9]*$/;

    if (regex.test(value)) {
      setProtsentSeller((prev) => ({
        ...prev,
        [productId]: value,
      }));
    }
  };

  const handleBlur = (productId: string, isSeller: boolean) => {
    const value = protsent[productId] || protsentSeller[productId];
    sendDataToBackend(value, productId, isSeller);
  };

  const sendDataToBackend = (
    percent: string,
    productId: string,
    isSeller: boolean,
  ) => {
    const data = {
      percent: parseFloat(percent),
      is_partner: isSeller,
    };

    axiosInstance
      .post(`/root/game/mobile-legands/update/percent/${productId}`, data)
      .then((response) => {
        console.log("Backenddan javob:", response.data);
        fetchStats(currentPage);
      })
      .catch((error) => {
        console.error("Xatolik:", error);
      });
  };

  const formatNumber = (num: number) => {
    if (Number.isInteger(num)) {
      return num.toLocaleString("fr-FR").replace(/\s/g, " ");
    }

    return num
      .toFixed(3)
      .replace(",", ".")
      .replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  const UpdateData = async () => {
    try {
      const response = await axiosInstance.post(
        `/root/game/mobile-legands/promocodes/${id}`,
      );
      toast.success("Muvaffaqiyatli yanilandi");
      setReload((prev) => !prev);
    } catch (error) {
      console.error("Muvaffaqiyatli yanilishda xatolik:", error);
    }
  };

  const [activeId, setActiveId] = useState();
  const ModalOpen = (productId: any) => {
    setModal(true);
    setActiveId(productId);
  };
  if (loading) return <Loader />;
  return (
    <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      {id == "00984e54-78f0-44f8-ad48-dac23d838bdc" && (
        <div className="flex justify-between  py-4 pl-4">
          <button
            className="rounded bg-[green] px-4 py-3 text-white"
            onClick={UpdateData}
          >
            Import qilish
          </button>
          <CurrencyInput setReload={setReload} />
        </div>
      )}
      <div className="grid grid-cols-11 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-11 md:px-6 2xl:px-7.5">
        <div
          onClick={goBack}
          className="col-span-2 flex cursor-pointer items-center gap-4"
        >
          <FaArrowLeft />
          <p className="font-medium">Promokod nomi</p>
        </div>
        {id != "00984e54-78f0-44f8-ad48-dac23d838bdc" && (
          <div className="col-span-2 flex items-center">
            <p className="font-medium">Qolgan</p>
          </div>
        )}
        <div
          className={`col-span-2 flex ${id == "00984e54-78f0-44f8-ad48-dac23d838bdc" ? "justify-center" : ""} items-center`}
        >
          <p className="font-medium">Sotilgan</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Tan Narxi</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Mijoz Narxi</p>
        </div>
        <div className="col-span-1 flex items-center">
          <p className="font-medium">Sotuchi Narxi</p>
        </div>
        {id != "00984e54-78f0-44f8-ad48-dac23d838bdc" ? (
          <div className="col-span-2 flex items-center justify-end">
            <Link
              href="promo-create"
              className="flex w-20 justify-center rounded bg-green-400 px-5 py-1 text-2xl text-white"
            >
              +
            </Link>
          </div>
        ) : (
          <>
            <div className="col-span-2 flex items-center px-10">
              <p className="font-medium">Mijoz uchun foiz</p>
            </div>
            <div className="col-span-2 flex items-center">
              <p className="font-medium">Sotuvchi uchun foiz</p>
            </div>
          </>
        )}
      </div>

      {data.length > 0 &&
        data.map((product, key) => (
          <div
            className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-11 md:px-6 2xl:px-7.5"
            key={key}
          >
            <Link
              href={`${key}/${product.id}`}
              className="col-span-2 flex items-center"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <p className="line-clamp-1 text-body-sm font-bold text-black dark:text-dark-8">
                  {(currentPage - 1) * 10 + key + 1}. {product.name}
                </p>
              </div>
            </Link>
            {id != "00984e54-78f0-44f8-ad48-dac23d838bdc" && (
              <Link
                href={`${key}/${product.id}`}
                className="col-span-2 flex items-center"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                  <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                    {product.promocode_values.not_sold}
                  </p>
                </div>
              </Link>
            )}

            <Link
              href={`${key}/${product.id}`}
              className={`col-span-2 flex ${id == "00984e54-78f0-44f8-ad48-dac23d838bdc" ? "justify-center" : ""} items-center`}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <p className="text-body-sm font-medium text-dark dark:text-dark-6">
                  {product.promocode_values.sold}
                </p>
              </div>
            </Link>
            <Link
              href={`${key}/${product.id}`}
              className="col-span-1 flex items-center"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="flex flex-col gap-0">
                  <p className="flex items-center text-body-xs font-medium text-dark dark:text-dark-6">
                    {product.body_price_usd
                      ? formatNumber(product.body_price_usd)
                      : "0"}
                    <IoLogoUsd />
                  </p>

                  <p className="flex text-body-xs font-medium text-dark dark:text-dark-6">
                    {product.body_price_uzs
                      ? formatNumber(product.body_price_uzs)
                      : "0"}{" "}
                    S
                  </p>
                  <p className="flex items-center text-body-xs font-medium text-dark dark:text-dark-6">
                    {product.body_price_rub
                      ? formatNumber(product.body_price_rub)
                      : "0"}
                    <BiRuble />
                  </p>
                </div>
              </div>
            </Link>
            <Link
              href={`${key}/${product.id}`}
              className="col-span-1 flex items-center"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="flex flex-col gap-0">
                  <p className="flex items-center text-body-xs font-medium text-dark dark:text-dark-6">
                    {product.customer_price_usd
                      ? formatNumber(product.customer_price_usd)
                      : "0"}
                    <IoLogoUsd />
                  </p>

                  <p className="flex text-body-xs font-medium text-dark dark:text-dark-6">
                    {product.customer_price_uzs
                      ? formatNumber(product.customer_price_uzs)
                      : "0"}{" "}
                    S
                  </p>
                  <p className="flex items-center text-body-xs font-medium text-dark dark:text-dark-6">
                    {product.customer_price_rub
                      ? formatNumber(product.customer_price_rub)
                      : "0"}
                    <BiRuble />
                  </p>
                </div>
              </div>
            </Link>
            <Link
              href={`${key}/${product.id}`}
              className="col-span-1 flex items-center"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                <div className="flex flex-col gap-0">
                  <p className="flex items-center text-body-xs font-medium text-dark dark:text-dark-6">
                    {product.partner_price_usd
                      ? formatNumber(product.partner_price_usd)
                      : "0"}
                    <IoLogoUsd />
                  </p>

                  <p className="flex text-body-xs font-medium text-dark dark:text-dark-6">
                    {product.partner_price_uzs
                      ? formatNumber(product.partner_price_uzs)
                      : "0"}{" "}
                    S
                  </p>
                  <p className="flex items-center text-body-xs font-medium text-dark dark:text-dark-6">
                    {product.partner_price_rub
                      ? formatNumber(product.partner_price_rub)
                      : "0"}
                    <BiRuble />
                  </p>
                </div>
              </div>
            </Link>

            {id == "00984e54-78f0-44f8-ad48-dac23d838bdc" && (
              <div className="col-span-2 flex items-center">
                <input
                  type="text"
                  value={
                    protsent[product.id] !== undefined
                      ? protsent[product.id]
                      : product.percent
                  }
                  onChange={(e) => handleInputChange(e, product.id)}
                  onBlur={() => handleBlur(product.id, false)}
                  className="mx-8 w-full cursor-pointer rounded-[7px] border-[1.5px] border-stroke px-3 py-[9px] outline-none transition"
                  placeholder="Oddiy Mijoz"
                />
              </div>
            )}
            <div className="col-span-2 flex cursor-pointer items-center justify-end gap-5">
              {id == "00984e54-78f0-44f8-ad48-dac23d838bdc" && (
                <input
                  type="text"
                  value={
                    protsentSeller[product.id] !== undefined
                      ? protsentSeller[product.id]
                      : product.partner_percent
                  }
                  onChange={(e) => handleInputChangeSeller(e, product.id)}
                  onBlur={() => handleBlur(product.id, true)}
                  className="w-full cursor-pointer rounded-[7px] border-[1.5px] border-stroke px-3 py-[9px] outline-none transition"
                  placeholder="Sotuvchi"
                />
              )}
              <Link href={`promo-create?${product.id}`}>
                <div className="rounded bg-[orange] px-3 py-1 text-white">
                  <FiEdit2 />
                </div>
              </Link>
              {id != "00984e54-78f0-44f8-ad48-dac23d838bdc" && (
                <div
                  onClick={() => ModalOpen(product.id)}
                  className="rounded bg-[green] px-3 py-1 text-white"
                >
                  <FaFileArrowUp />
                </div>
              )}
              {id != "00984e54-78f0-44f8-ad48-dac23d838bdc" && (
                <div
                  onClick={() => DeleteGame(product.id)}
                  className="rounded bg-[red] px-3 py-1 text-white"
                >
                  <MdOutlineDeleteOutline />
                </div>
              )}
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
          <textarea
            className="w-full flex-grow resize-none rounded-[7px] border-[1.5px] border-stroke px-3 py-[9px] outline-none transition file:mr-4 file:rounded file:border-[0.5px] file:border-stroke file:bg-stroke file:px-2.5 file:py-1 file:text-body-xs file:font-medium file:text-dark-5 focus:border-primary file:focus:border-primary active:border-primary disabled:cursor-default disabled:bg-dark dark:border-dark-3 dark:bg-dark-2 dark:file:border-dark-3 dark:file:bg-white/30 dark:file:text-white"
            value={promocodetext}
            // onChange={(e) => setPromocode(e.target.value)}
            onChange={handleTextChange}
          />
          <div className="mt-4 flex justify-end">
            <button
              className="rounded bg-green-900 px-4 py-2 text-white"
              onClick={() => PromoCreateValue(activeId)}
            >
              Qo&apos;shish
            </button>
          </div>
        </div>
      )}
      {modal1 && (
        <div className="z-5000 absolute left-[50%] top-[50%] flex h-[500px] w-[800px] translate-x-[-50%] translate-y-[-50%] flex-col rounded-lg border-[2px] border-red-600 bg-white px-4 py-4 shadow-2xl dark:bg-gray-dark dark:shadow-card">
          <div className="mb-3 flex items-center justify-between">
            <label className="block text-body-sm font-medium text-dark dark:text-white">
              Bu promokodlar oldin qo&apos;shilgan
            </label>
            <button className="text-sm" onClick={closeModal1}>
              ❌
            </button>
          </div>
          <div className="mt-5 flex max-h-[400px] flex-col overflow-y-auto">
            {data1?.map((item: string, index: number) => (
              <p key={index}>{item}</p>
            ))}
          </div>
        </div>
      )}
      <ConfirmDeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen("")}
        onConfirm={() => handleDelete(isModalOpen)}
        title="Siz ushbu malumotni o'chirmoqchimisiz?"
        description="Bu amalni qaytarib bo'lmaydi. Diqqat bilan tasdiqlang."
      />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => setCurrentPage(page)}
      />
    </div>
  );
};

export default TableGameDetails;
