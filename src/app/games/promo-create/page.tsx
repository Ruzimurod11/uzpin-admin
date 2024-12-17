import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import GamesPromoCreate from "@/components/GamePromoCreate";

export const metadata: Metadata = {
  title: "PROMOCOD QO'SHISH",
  description: "",
};

const GamesCreatePage = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-7xl">
        {/* <Breadcrumb pageName="Promo Kod Yaratish" /> */}
        <GamesPromoCreate />
      </div>
    </DefaultLayout>
  );
};

export default GamesCreatePage;
