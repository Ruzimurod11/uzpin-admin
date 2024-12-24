import { useEffect, useState } from "react";
import axiosInstance from "@/libs/axios";
import CustomCalendar2 from "../Charts/CustomCalendar2";

interface Card {
  promocode: string;
  total_count: number;
  total_amount: { USD: number };
  benefit: { USD: number };
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

  const fetchCards = async (bot = "", game = "") => {
    setLoadings(true);
    try {
      const queryParams: string[] = [];
      if (bot) queryParams.push(`bot=${bot}`);
      if (game) queryParams.push(`game=${game}`);
      const queryString =
        queryParams.length > 0 ? `?${queryParams.join("&")}` : "";

      const response = await axiosInstance.get(
        `/root/analytics/bot${queryString}`,
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
    } catch (error) {
      console.error("Botlarni yuklashda xatolik:", error);
    } finally {
      setLoadings(false);
    }
  };

  useEffect(() => {
    fetchCards();
    fetchBots();
    fetchGames();
  }, []);

  const handleBotChange = (selected: string) => {
    setSelectedBot(selected);
    fetchCards(selected, selectedGame);
  };

  const handleGameChange = (selected: string) => {
    setSelectedGame(selected);
    fetchCards(selectedBot, selected);
  };

  if (loadings) {
    return (
      <div className="flex h-full items-center justify-center">
        <div className="spinner-border text-primary" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

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
      <select value={value} onChange={handleChange} className="select-class">
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
      <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-6 md:px-6 2xl:px-7.5">
        <div className="col-span-1 flex items-center justify-center">
          {bots.length > 0 && (
            <DefaultSelectOption
              options={bots}
              onChange={handleBotChange}
              value={selectedBot}
            />
          )}
        </div>
        <div className="col-span-1 flex items-center justify-center">
          {games.length > 0 && (
            <DefaultSelectOption
              options={games}
              onChange={handleGameChange}
              value={selectedGame}
            />
          )}
        </div>
        <div className="col-span-2 flex items-center justify-center gap-2"></div>
        <div className="col-span-2 flex items-center justify-center gap-2">
          Saralash: <CustomCalendar2 />
        </div>
      </div>

      <div className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-8 md:px-6 2xl:px-7.5">
        <div className="col-span-2 flex items-center justify-center">
          <p className="font-medium">{name}</p>
        </div>
        <div className="col-span-2 flex items-center justify-center">
          <p className="font-medium">Sotilganlar soni</p>
        </div>
        <div className="col-span-2 flex items-center justify-center">
          <p className="font-medium">Umumiy Narxi</p>
        </div>
        <div className="col-span-2 flex items-center justify-center">
          <p className="font-medium">Foyda</p>
        </div>
      </div>

      {cards.map((product, key) => (
        <div
          className="grid grid-cols-6 border-t border-stroke px-4 py-4.5 dark:border-dark-3 sm:grid-cols-8 md:px-6 2xl:px-7.5"
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
          <div className="col-span-2 flex items-center justify-center">
            <p className="text-body-sm font-medium text-dark dark:text-dark-6">
              {product.total_amount?.USD} USD
            </p>
          </div>
          <div className="col-span-2 flex items-center justify-center">
            <p className="text-body-sm font-medium text-dark dark:text-dark-6">
              {product.benefit?.USD} USD
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TableInfos;
