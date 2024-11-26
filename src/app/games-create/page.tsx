import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import GamesBoxCreate from "@/components/GameBoxCreate";

export const metadata: Metadata = {
  title: "O'YINLAR QO'SHISH",
  description: "",
};

const GamesCreatePage = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-7xl">
        <Breadcrumb pageName="O'yin Yaratish" />
        <GamesBoxCreate />
      </div>
    </DefaultLayout>
  );
};

export default GamesCreatePage;
