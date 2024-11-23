import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import GamesBox from "@/components/GamesBox";

export const metadata: Metadata = {
  title: "ADMIN || O'YINLAR",
  description: "",
};

const GamesPage = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-7xl">
        <Breadcrumb pageName="O'yinlar" />
        <GamesBox />
      </div>
    </DefaultLayout>
  );
};

export default GamesPage;
