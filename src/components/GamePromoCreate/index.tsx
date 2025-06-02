"use client";
import axiosInstance from "@/libs/axios";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import SelectGroupOne from "../SelectGame/SelectGroupOne";
import UploadComponent from "../UploadComponent";

interface Game {
  id: string;
  name_uz: string;
}

interface Payload {
  name: string;
  customer_price_usd: number | "";
  customer_price_uzs: number | "";
  customer_price_rub: number | "";
  partner_price_usd: number | "";
  partner_price_uzs: number | "";
  partner_price_rub: number | "";
  body_price_usd: number | "";
  body_price_uzs: number | "";
  body_price_rub: number | "";
  game: string;
  photo?: string;
}

const GamesPromoCreate = () => {
  const [photo, setPhoto] = useState("");
  const [games, setGames] = useState<Game[]>([]);
  const [gameId, setGameId] = useState<string>("");
  const [promoName, setPromoName] = useState<string>("");
  const [customerPriceUSD, setCustomerPriceUSD] = useState<number | "">("");
  const [customerPriceUZS, setCustomerPriceUZS] = useState<number | "">("");
  const [customerPriceRUB, setCustomerPriceRUB] = useState<number | "">("");
  const [partnerPriceUSD, setPartnerPriceUSD] = useState<number | "">("");
  const [partnerPriceUZS, setPartnerPriceUZS] = useState<number | "">("");
  const [partnerPriceRUB, setPartnerPriceRUB] = useState<number | "">("");
  const [bodyPriceUSD, setBodyPriceUSD] = useState<number | "">("");
  const [bodyPriceUZS, setBodyPriceUZS] = useState<number | "">("");
  const [bodyPriceRUB, setBodyPriceRUB] = useState<number | "">("");
  const router = useRouter();

  const searchParams = useSearchParams();

  const fullQuery = searchParams?.toString();
  const extractedValue = fullQuery?.split("=")[0];

  useEffect(() => {
    const fetchCardDetails = async () => {
      if (extractedValue) {
        try {
          const response = await axiosInstance.get(
            `/root/game/promocodes/${extractedValue}/detail`,
          );

          setPromoName(response.data.name || "");
          setCustomerPriceUSD(response.data.customer_price_usd || "");
          setCustomerPriceUZS(response.data.customer_price_uzs || "");
          setCustomerPriceRUB(response.data.customer_price_rub || "");
          setPartnerPriceUSD(response.data.partner_price_usd || "");
          setPartnerPriceUZS(response.data.partner_price_uzs || "");
          setPartnerPriceRUB(response.data.partner_price_rub || "");
          setBodyPriceUZS(response.data.body_price_uzs || "");
          setBodyPriceRUB(response.data.body_price_rub || "");
          setBodyPriceUSD(response.data.body_price_usd || "");
          setGameId(response.data.game.id);
        } catch (error) {
          console.error("Failed to fetch card details:", error);
        }
      }
    };

    fetchCardDetails();
  }, [extractedValue]);

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await axiosInstance.get("/root/game/games", {
          params: { page: 1, page_size: 100 },
        });
        setGames(response.data.results || []);
      } catch (error) {
        console.error("O'yinlar ro'yxatini olishda xatolik:", error);
      }
    };

    fetchGames();
  }, []);

  const handleUploadSuccess = (key: string, url: string) => {
    setPhoto(url);
  };

  const handleSubmit = async () => {
    const payload: Payload = {
      name: promoName,
      customer_price_usd: customerPriceUSD,
      customer_price_uzs: customerPriceUZS,
      customer_price_rub: customerPriceRUB,
      partner_price_usd: partnerPriceUSD,
      partner_price_uzs: partnerPriceUZS,
      partner_price_rub: partnerPriceRUB,
      body_price_usd: bodyPriceUSD,
      body_price_uzs: bodyPriceUZS,
      body_price_rub: bodyPriceRUB,
      game: gameId,
    };

    if (photo) {
      payload.photo = photo;
    }

    try {
      if (extractedValue) {
        await axiosInstance.put(
          `/root/game/promocodes/${extractedValue}/detail`,
          payload,
        );
        router.push(`/games/${gameId}`);
        toast.success("Promokod muvaffaqiyatli yangilandi.");
      } else {
        await axiosInstance.post(`/root/game/promocodes/${gameId}`, payload);
        router.push(`/games/${gameId}`);
        toast.success("Promokod muvaffaqiyatli qo'shildi.");
      }
    } catch (error) {
      toast.error("Promokod yaratishda xatolik bo'ldi.");
    }
  };

  return (
    <div className="rounded-[10px] border border-stroke bg-white shadow-1 dark:border-dark-3 dark:bg-gray-dark dark:shadow-card">
      <div className="border-b border-stroke px-6.5 py-4 dark:border-dark-3">
        <h3 className="font-medium text-dark dark:text-white">
          Yangi o&apos;yin malumotlari
        </h3>
      </div>

      <div className="grid grid-cols-6 gap-5.5 p-6.5">
        <div className="col-span-6">
          {gameId !== "00984e54-78f0-44f8-ad48-dac23d838bdc" && (
            <>
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                O&apos;yin turi
              </label>
              <SelectGroupOne
                options={games.map((game) => ({
                  value: game.id,
                  label: game.name_uz,
                }))}
                selectedOption={gameId}
                onChange={(value) => setGameId(value)}
              />
            </>
          )}
        </div>
        <div className="col-span-3">
          <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
            Asosiy rasm
          </label>
          <UploadComponent
            onUploadSuccess={(url) => handleUploadSuccess("cover", url)}
          />
        </div>
        <div className="col-span-3">
          <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
            Promokod nomi
          </label>
          <input
            type="text"
            value={promoName}
            onChange={(e) => setPromoName(e.target.value)}
            className="w-full rounded-[7px] border-[1.5px] border-stroke px-3 py-[9px] outline-none transition dark:border-dark-3 dark:bg-dark-2 dark:text-white"
          />
        </div>

        {gameId !== "00984e54-78f0-44f8-ad48-dac23d838bdc" && (
          <>
            <div className="col-span-2">
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                Mijoz uchun narx (USD)
              </label>
              <input
                type="number"
                value={customerPriceUSD}
                onChange={(e) =>
                  setCustomerPriceUSD(Number(e.target.value) || "")
                }
                className="w-full rounded-[7px] border-[1.5px] border-stroke px-3 py-[9px] outline-none transition dark:border-dark-3 dark:bg-dark-2 dark:text-white"
              />
            </div>
            <div className="col-span-2">
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                Mijoz uchun narx (UZS)
              </label>
              <input
                type="number"
                value={customerPriceUZS}
                onChange={(e) =>
                  setCustomerPriceUZS(Number(e.target.value) || "")
                }
                className="w-full rounded-[7px] border-[1.5px] border-stroke px-3 py-[9px] outline-none transition dark:border-dark-3 dark:bg-dark-2 dark:text-white"
              />
            </div>
            <div className="col-span-2">
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                Mijoz uchun narx (RUB)
              </label>
              <input
                type="number"
                value={customerPriceRUB}
                onChange={(e) =>
                  setCustomerPriceRUB(Number(e.target.value) || "")
                }
                className="w-full rounded-[7px] border-[1.5px] border-stroke px-3 py-[9px] outline-none transition dark:border-dark-3 dark:bg-dark-2 dark:text-white"
              />
            </div>
            <div className="col-span-2">
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                Sotuvchi uchun narx (USD)
              </label>
              <input
                type="number"
                value={partnerPriceUSD}
                onChange={(e) =>
                  setPartnerPriceUSD(Number(e.target.value) || "")
                }
                className="w-full rounded-[7px] border-[1.5px] border-stroke px-3 py-[9px] outline-none transition dark:border-dark-3 dark:bg-dark-2 dark:text-white"
              />
            </div>
            <div className="col-span-2">
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                Sotuvchi uchun narx (UZS)
              </label>
              <input
                type="number"
                value={partnerPriceUZS}
                onChange={(e) =>
                  setPartnerPriceUZS(Number(e.target.value) || "")
                }
                className="w-full rounded-[7px] border-[1.5px] border-stroke px-3 py-[9px] outline-none transition dark:border-dark-3 dark:bg-dark-2 dark:text-white"
              />
            </div>
            <div className="col-span-2">
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                Sotuvchi uchun narx (RUB)
              </label>
              <input
                type="number"
                value={partnerPriceRUB}
                onChange={(e) =>
                  setPartnerPriceRUB(Number(e.target.value) || "")
                }
                className="w-full rounded-[7px] border-[1.5px] border-stroke px-3 py-[9px] outline-none transition dark:border-dark-3 dark:bg-dark-2 dark:text-white"
              />
            </div>
            <div className="col-span-2">
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                Tan narx (USD)
              </label>
              <input
                type="number"
                value={bodyPriceUSD}
                onChange={(e) => setBodyPriceUSD(Number(e.target.value) || "")}
                className="w-full rounded-[7px] border-[1.5px] border-stroke px-3 py-[9px] outline-none transition dark:border-dark-3 dark:bg-dark-2 dark:text-white"
              />
            </div>
            <div className="col-span-2">
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                Tan narx (UZS)
              </label>
              <input
                type="number"
                value={bodyPriceUZS}
                onChange={(e) => setBodyPriceUZS(Number(e.target.value) || "")}
                className="w-full rounded-[7px] border-[1.5px] border-stroke px-3 py-[9px] outline-none transition dark:border-dark-3 dark:bg-dark-2 dark:text-white"
              />
            </div>
            <div className="col-span-2">
              <label className="mb-3 block text-body-sm font-medium text-dark dark:text-white">
                Tan narx (RUB)
              </label>
              <input
                type="number"
                value={bodyPriceRUB}
                onChange={(e) => setBodyPriceRUB(Number(e.target.value) || "")}
                className="w-full rounded-[7px] border-[1.5px] border-stroke px-3 py-[9px] outline-none transition dark:border-dark-3 dark:bg-dark-2 dark:text-white"
              />
            </div>
          </>
        )}

        <div className="col-span-6 flex justify-end">
          <button
            onClick={handleSubmit}
            className="flex w-40 justify-center rounded bg-green-400 px-5 py-2 text-white"
          >
            SAQLASH
          </button>
        </div>
      </div>
    </div>
  );
};

export default GamesPromoCreate;
