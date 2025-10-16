import DefaultLayout from "@/components/Layouts/DefaultLaout";
import PromoBoxDetails from "@/components/PromoBoxDetails";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Promokodlar",
  description: "",
};

const GamesPageDetails = () => {
  return (
    <DefaultLayout>
      <PromoBoxDetails />
    </DefaultLayout>
  );
};

export default GamesPageDetails;
