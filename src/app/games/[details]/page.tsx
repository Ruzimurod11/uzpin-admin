import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import GamesBoxDetails from "@/components/GamesBoxDetails";

export const metadata: Metadata = {
  title: "O'YINLAR",
  description: "",
};

const GamesPageDetails = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-7xl">
        <Breadcrumb pageName="PUBG" />
        <GamesBoxDetails />
      </div>
    </DefaultLayout>
  );
};

export default GamesPageDetails;
