import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import SalesPromoBox from "@/components/SalesPromo";

export const metadata: Metadata = {
  title: "Sotilgan Promokodlar",
  description: " ",
};

const GamesPage = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-7xl">
        <Breadcrumb pageName="Sotilgan Promokodlar" />
        <SalesPromoBox />
      </div>
    </DefaultLayout>
  );
};

export default GamesPage;
