import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import PromoBoxDetails from "@/components/PromoBoxDetails";

export const metadata: Metadata = {
  title: "Promokodlar",
  description: "",
};

const GamesPageDetails = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-7xl">
        {/* <Breadcrumb pageName="60 UC" /> */}
        <PromoBoxDetails />
      </div>
    </DefaultLayout>
  );
};

export default GamesPageDetails;
