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
  const [selectedBot, setSelectedBot] = useState<string>("");
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

  const fetchCards = async (bot = "", game = "") => {
    setLoadings(true);
    try {
      const queryParams: string[] = [];
      if (bot && bot != "barchasi") queryParams.push(`bot=${bot}`);
      if (game && game != "barchasi") queryParams.push(`game=${game}`);
      const queryString =
        queryParams.length > 0 ? `&${queryParams.join("&")}` : "";

      const response = await axiosInstance.get(
        `/root/analytics/bot?${time}${queryString}`,
      );
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
      console.error("O'yinlarni yuklashda xatolik:", error);
    } finally {
      setLoadings(false);
    }
  };

  const fetchBots = async () => {
    setLoadings(true);
    try {
      const response = await axiosInstance.get("/root/sold/types");
      setBots(response.data || []);
      console.log(response.data);
    } catch (error) {
      console.error("Botlarni yuklashda xatolik:", error);
    } finally {
      setLoadings(false);
    }
  };

  useEffect(() => {
    fetchCards();
    fetchGames();
    fetchBots();
  }, [time]);

  const handleBotChange = (selected: string) => {
    setSelectedBot(selected);
    fetchCards(selected, selectedGame);
  };

  const handleGameChange = (selected: string) => {
    setSelectedGame(selected);
    fetchCards(selectedBot, selected);
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

  return (
    <div className="rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-10 md:px-6 2xl:px-7.5">
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
        <div className="col-span-3 flex items-center justify-center gap-2"></div>
        <div className="col-span-3 flex items-center justify-center gap-2">
          Saralash: <CustomCalendar onDateChange={handleDateChange} />
        </div>
      </div>

      <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-10 md:px-6 2xl:px-7.5">
        <div className="col-span-2 flex items-center justify-center">
          <p className="font-medium">{name}</p>
        </div>
        <div className="col-span-2 flex items-center justify-center">
          <p className="font-medium">Sotilganlar soni</p>
        </div>
        <div className="col-span-3 flex items-center justify-center">
          <p className="font-medium">Umumiy narxi</p>
        </div>
        <div className="col-span-3 flex items-center justify-center">
          <p className="font-medium">Foyda</p>
        </div>
      </div>

      {cards.map((product, key) => (
        <div
          className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-10 md:px-6 2xl:px-7.5"
          key={key}
        >
          <div className="col-span-2 flex items-center justify-center">
            <p className="text-body-sm font-medium text-dark dark:text-dark-6">
              {key + 1}. {product.promocode}
            </p>
          </div>
          <div className="col-span-2 flex items-center justify-center">
            <p className="text-body-sm font-medium text-dark dark:text-dark-6">
              {product.total_count}
            </p>
          </div>
          <div className="col-span-3 flex items-center justify-center">
            <div className="flex gap-4">
              <p className="flex items-center text-body-xs font-medium text-dark dark:text-dark-6">
                {product.total_amount.USD}
                <IoLogoUsd />
              </p>

              <p className="flex text-body-xs font-medium text-dark dark:text-dark-6">
                {product.total_amount.UZS} S
              </p>
              <p className="flex items-center text-body-xs font-medium text-dark dark:text-dark-6">
                {product.total_amount.RUB}
                <BiRuble />
              </p>
            </div>
          </div>
          <div className="col-span-3 flex items-center justify-center">
            <div className="flex gap-4">
              <p className="flex items-center text-body-xs font-medium text-dark dark:text-dark-6">
                {product.benefit.USD}
                <IoLogoUsd />
              </p>

              <p className="flex text-body-xs font-medium text-dark dark:text-dark-6">
                {product.benefit.UZS} S
              </p>
              <p className="flex items-center text-body-xs font-medium text-dark dark:text-dark-6">
                {product.benefit.RUB}
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
