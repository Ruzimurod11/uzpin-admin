import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import GamesPromoCreate from "@/components/GamePromoCreate";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "PROMOCOD QO'SHISH",
  description: "",
};

const GamesCreatePage = () => {
  return (
    <DefaultLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="mx-auto max-w-7xl">
          {/* <Breadcrumb pageName="Promo Kod Yaratish" /> */}
          <GamesPromoCreate />
        </div>
      </Suspense>
    </DefaultLayout>
  );
};

export default GamesCreatePage;
