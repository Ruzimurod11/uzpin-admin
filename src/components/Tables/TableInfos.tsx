"use client";
import { useEffect, useState } from "react";
import axiosInstance from "@/libs/axios";
import { BiRuble } from "react-icons/bi";
import { IoLogoUsd } from "react-icons/io5";
import Loader from "../common/Loader";
import CustomCalendar from "../Charts/CustomCalendar";

interface Card {
  promocode: string;
  total_count: number;
  total_amount: { USD: number; UZS: number; RUB: number };
  benefit: { USD: number; UZS: number; RUB: number };
}

interface TableInfosProps {
  name: string;
}

const TableInfos = ({ name }: TableInfosProps) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [games, setGames] = useState<string[]>([]);
  const [bots, setBots] = useState<string[]>([]);
  const [referals, setReferals] = useState<{ id: string; name: string }[]>([]);
  const [selectedBot, setSelectedBot] = useState<string>("");
  const [selectedId, setSelectedId] = useState<string>("");
  const [selectedGame, setSelectedGame] = useState<string>("");
  const [loadings, setLoadings] = useState(false);

  const [time, setTime] = useState("");

  const handleDateChange = (startDate: string, endDate: string) => {
    const queryParams = new URLSearchParams({
      start_date: startDate,
      end_date: endDate,
    }).toString();

    setTime(queryParams);
  };

  const fetchCards = async (bot = "", game = "", partner = "") => {
    setLoadings(true);

    try {
      const queryParams: string[] = [];

      if (bot && bot !== "barchasi") queryParams.push(`bot=${bot}`);
      if (game && game !== "barchasi") queryParams.push(`game=${game}`);
      if (partner && partner !== "barchasi")
        queryParams.push(`partner=${partner}`);

      const queryString =
        queryParams.length > 0 ? `${queryParams.join("&")}` : "";
      const url = `/root/analytics/bot?${time}${queryString}`;

      const response = await axiosInstance.get(url);
      setCards(response.data || []);
    } catch (error) {
      console.error("Kartalarni yuklashda xatolik:", error);
    } finally {
      setLoadings(false);
    }
  };

  const fetchGames = async () => {
    setLoadings(true);
    try {
      const response = await axiosInstance.get("/root/analytics/bot/games");
      setGames(response.data || []);
    } catch (error) {
    } finally {
      setLoadings(false);
    }
  };

  const fetchReferals = async (): Promise<void> => {
    setLoadings(true);
    try {
      const response = await axiosInstance.get<any>("/root/partner/");

      // Ma'lumotlarni formatlash
      const formattedReferals: { id: string; name: string }[] =
        response.data.results?.map(({ id, fullname }: any) => ({
          id: String(id), // `id` ning string bo‘lishini ta’minlash
          name: fullname || "Noma'lum", // fullname bo‘sh bo‘lsa, default qiymat
        })) || [];

      setReferals(formattedReferals || []);
    } catch (error) {
      console.error("Referallarni yuklashda xatolik:", error);
    } finally {
      setLoadings(false);
    }
  };

  const fetchBots = async () => {
    setLoadings(true);
    try {
      const response = await axiosInstance.get("/root/sold/types");
      setBots(response.data || []);
    } catch (error) {
    } finally {
      setLoadings(false);
    }
  };

  useEffect(() => {
    fetchCards();
    fetchGames();
    fetchBots();
  }, [time]);
  useEffect(() => {
    fetchReferals();
  }, []);

  const handleBotChange = (selected: string) => {
    setSelectedBot(selected);
    fetchCards(selected, selectedGame);
  };

  const handleReferalChange = (selectedId: string) => {
    setSelectedId(selectedId);
    fetchCards(selectedBot, selectedGame, selectedId); // 🛠 PARTNER TO‘G‘RI O‘TAYOTGANINI TEKSHIRING
  };

  const handleGameChange = (selected: string) => {
    setSelectedGame(selected);
    fetchCards(selectedBot, selected);
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

  // if (loadings) return <Loader />;

  const DefaultSelectOption = ({
    options,
    onChange,
    value,
  }: {
    options: string[];
    onChange: (selected: string) => void;
    value: string;
  }) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      onChange(event.target.value);
    };

    return (
      <select
        value={value}
        onChange={handleChange}
        className="select-class rounded border p-2 text-lg capitalize outline-none"
      >
        {options.map((option, index) => (
          <option key={index} value={option}>
            {option}
          </option>
        ))}
      </select>
    );
  };

  const DefaultSelectOptionId = ({
    options,
    onChange,
    value,
  }: {
    options: { id: string; name: string }[];
    onChange: (selectedId: string) => void;
    value: string;
  }) => {
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      onChange(event.target.value); // Faqat `id` jo‘natiladi
    };

    return (
      <select
        value={value || ""}
        onChange={handleChange}
        className="select-class rounded border p-2 text-lg capitalize outline-none"
      >
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.name}
          </option>
        ))}
      </select>
    );
  };

  return (
    <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-10 md:px-6 2xl:px-7.5">
        <div className="col-span-2 flex items-center justify-center">
          {referals.length > 0 && (
            <DefaultSelectOptionId
              options={[{ id: "", name: "Barchasi" }, ...referals]}
              onChange={handleReferalChange}
              value={selectedId}
            />
          )}
        </div>
        <div className="col-span-2 flex items-center justify-center">
          {bots.length > 0 && (
            <DefaultSelectOption
              options={["barchasi", ...bots]}
              onChange={handleBotChange}
              value={selectedBot}
            />
          )}
        </div>
        <div className="col-span-2 flex items-center justify-center">
          {games.length > 0 && (
            <DefaultSelectOption
              options={["barchasi", ...games]}
              onChange={handleGameChange}
              value={selectedGame}
            />
          )}
        </div>
        <div className="col-span-1 flex items-center justify-center"></div>

        <div className="col-span-3 flex items-center justify-end gap-4">
          <span className="whitespace-nowrap">Saralash:</span>
          <CustomCalendar onDateChange={handleDateChange} />
        </div>
      </div>

      <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-10 md:px-6 2xl:px-7.5">
        <div className="col-span-2 flex items-center">
          <p className="font-medium">{name}</p>
        </div>
        <div className="col-span-2 flex items-center">
          <p className="font-medium">Sotilganlar soni</p>
        </div>
        <div className="col-span-3 flex items-center">
          <p className="font-medium">Umumiy narxi</p>
        </div>
        <div className="col-span-3 flex items-center">
          <p className="font-medium">Foyda</p>
        </div>
      </div>

      {cards.map((product, key) => (
        <div
          className={`grid grid-cols-6 border-t ${key === 0 && "bg-[#fffaed] dark:bg-[#2a3746]"} border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-10 md:px-6 2xl:px-7.5`}
          key={key}
        >
          <div className="col-span-2 flex items-center">
            <p
              className={`flex items-center text-body-sm font-medium text-dark ${key === 0 && "dark:text-[#fbf8f1]"} dark:text-dark-6`}
            >
              {key + 1}. {product.promocode}
            </p>
          </div>
          <div className="col-span-2 flex items-center">
            <p
              className={`flex items-center text-body-sm font-medium text-dark ${key === 0 && "dark:text-[#fbf8f1]"} dark:text-dark-6`}
            >
              {product.total_count}
            </p>
          </div>
          <div className="col-span-3 flex items-center">
            <div className="flex flex-col gap-0">
              <p
                className={`flex items-center text-body-sm font-medium text-dark ${key === 0 && "dark:text-[#fbf8f1]"} dark:text-dark-6`}
              >
                {product.total_amount.USD
                  ? formatNumber(product.total_amount.USD)
                  : "0"}
                <IoLogoUsd />
              </p>

              <p
                className={`flex items-center text-body-sm font-medium text-dark ${key === 0 && "dark:text-[#fbf8f1]"} dark:text-dark-6`}
              >
                {product.total_amount.UZS
                  ? formatNumber(product.total_amount.UZS)
                  : "0"}{" "}
                S
              </p>
              <p
                className={`flex items-center text-body-sm font-medium text-dark ${key === 0 && "dark:text-[#fbf8f1]"} dark:text-dark-6`}
              >
                {product.total_amount.RUB
                  ? formatNumber(product.total_amount.RUB)
                  : "0"}
                <BiRuble />
              </p>
            </div>
          </div>
          <div className="col-span-3 flex items-center">
            <div className="flex flex-col gap-0">
              <p
                className={`flex items-center text-body-sm font-medium text-dark ${key === 0 && "dark:text-[#fbf8f1]"} dark:text-dark-6`}
              >
                {product.benefit.USD ? formatNumber(product.benefit.USD) : "0"}
                <IoLogoUsd />
              </p>

              <p
                className={`flex items-center text-body-sm font-medium text-dark ${key === 0 && "dark:text-[#fbf8f1]"} dark:text-dark-6`}
              >
                {product.benefit.UZS ? formatNumber(product.benefit.UZS) : "0"}{" "}
                S
              </p>
              <p
                className={`flex items-center text-body-sm font-medium text-dark ${key === 0 && "dark:text-[#fbf8f1]"} dark:text-dark-6`}
              >
                {product.benefit.RUB ? formatNumber(product.benefit.RUB) : "0"}
                <BiRuble />
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableInfos;
