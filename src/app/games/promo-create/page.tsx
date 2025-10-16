import GamesPromoCreate from "@/components/GamePromoCreate";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "PROMOCOD QO'SHISH",
  description: "",
};

const GamesCreatePage = () => {
  return (
    <DefaultLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <GamesPromoCreate />
      </Suspense>
    </DefaultLayout>
  );
};

export default GamesCreatePage;
