import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import SalesPromoBox from "@/components/SalesPromo";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Sotilgan Promokodlar",
  description: " ",
};

const GamesPage = () => {
  return (
    <DefaultLayout>
      <Suspense fallback={<p>Yuklanmoqda...</p>}>
        <div className="mx-auto max-w-7xl">
          <SalesPromoBox />
        </div>
      </Suspense>
    </DefaultLayout>
  );
};

export default GamesPage;
