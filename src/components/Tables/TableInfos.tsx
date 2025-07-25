"use client";
import axiosInstance from "@/libs/axios";
import { useEffect, useState } from "react";
import { BiRuble } from "react-icons/bi";
import { IoLogoUsd } from "react-icons/io5";
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

  const fetchCards = async (
    bot = "",
    game = "",
    partner = "",
    timeParam = time,
  ) => {
    setLoadings(true);
    try {
      const queryParams: string[] = [];

      if (bot && bot !== "barchasi") queryParams.push(`bot=${bot}`);
      if (game && game !== "barchasi") queryParams.push(`game=${game}`);
      if (partner && partner !== "barchasi")
        queryParams.push(`partner=${partner}`);

      const queryString = queryParams.join("&");
      const url = `/root/analytics/bot?${timeParam}${queryString ? `&${queryString}` : ""}`;
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
      const formattedReferals =
        response.data.results?.map(({ id, fullname }: any) => ({
          id: String(id),
          name: fullname || "Noma'lum",
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
    fetchCards(selectedBot, selectedGame, selectedId, time);
    fetchGames();
    fetchBots();
  }, [time]);

  useEffect(() => {
    fetchReferals();
  }, []);

  const handleBotChange = (selected: string) => {
    setSelectedBot(selected);
    fetchCards(selected, selectedGame, selectedId);
  };

  const handleReferalChange = (selected: string) => {
    setSelectedId(selected);
    fetchCards(selectedBot, selectedGame, selected);
  };

  const handleGameChange = (selected: string) => {
    setSelectedGame(selected);
    fetchCards(selectedBot, selected, selectedId);
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

  const DefaultSelectOption = ({
    options,
    onChange,
    value,
  }: {
    options: string[];
    onChange: (selected: string) => void;
    value: string;
  }) => {
    return (
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="select-class max-w-[250px] rounded border p-2 text-lg capitalize outline-none"
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
    onChange: (selected: string) => void;
    value: string;
  }) => {
    return (
      <select
        value={value || ""}
        onChange={(e) => onChange(e.target.value)}
        className="select-class w-full max-w-[150px] rounded border p-2 text-lg capitalize outline-none"
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
      <div className="grid grid-cols-10 border-t border-stroke px-4 py-4.5 dark:border-dark-3">
        <div className="col-span-2 flex items-center justify-start">
          {referals.length > 0 && (
            <DefaultSelectOptionId
              options={[{ id: "", name: "Barchasi" }, ...referals]}
              onChange={handleReferalChange}
              value={selectedId}
            />
          )}
        </div>
        <div className="col-span-2 flex items-center justify-start">
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
        <div className="col-span-1" />
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
          key={key}
          className={`grid grid-cols-6 border-t ${
            key === 0 && "bg-[#fffaed] dark:bg-[#2a3746]"
          } border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-10 md:px-6 2xl:px-7.5`}
        >
          <div className="col-span-2 flex items-center">
            <p
              className={`flex items-center text-body-sm font-medium text-dark ${
                key === 0 && "dark:text-[#fbf8f1]"
              } dark:text-dark-6`}
            >
              {key + 1}. {product.promocode}
            </p>
          </div>
          <div className="col-span-2 flex items-center">
            <p
              className={`text-body-sm font-medium text-dark ${
                key === 0 && "dark:text-[#fbf8f1]"
              } dark:text-dark-6`}
            >
              {product.total_count}
            </p>
          </div>
          <div className="col-span-3 flex flex-col gap-0">
            <p className="flex items-center gap-1">
              {formatNumber(product.total_amount.USD)} <IoLogoUsd />
            </p>
            <p className="flex items-center gap-1">
              {formatNumber(product.total_amount.UZS)} S
            </p>
            <p className="flex items-center gap-1">
              {formatNumber(product.total_amount.RUB)} <BiRuble />
            </p>
          </div>
          <div className="col-span-3 flex flex-col gap-0">
            <p className="flex items-center gap-1">
              {formatNumber(product.benefit.USD)} <IoLogoUsd />
            </p>
            <p className="flex items-center gap-1">
              {formatNumber(product.benefit.UZS)} S
            </p>
            <p className="flex items-center gap-1">
              {formatNumber(product.benefit.RUB)} <BiRuble />
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableInfos;
