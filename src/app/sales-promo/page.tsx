import DefaultLayout from "@/components/Layouts/DefaultLaout";
import SalesPromoBox from "@/components/SalesPromo";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Sotilgan Promokodlar",
  description: " ",
};

const GamesPage = () => {
  return (
    <DefaultLayout>
      <Suspense fallback={<p>Yuklanmoqda...</p>}>
        <SalesPromoBox />
      </Suspense>
    </DefaultLayout>
  );
};

export default GamesPage;
