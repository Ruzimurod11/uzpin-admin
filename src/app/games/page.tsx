import GamesBox from "@/components/GamesBox";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ADMIN || O'YINLAR",
  description: "",
};

const GamesPage = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-7xl">
        <GamesBox />
      </div>
    </DefaultLayout>
  );
};

export default GamesPage;
