import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import NotiveBox from "@/components/NotiveBox";

export const metadata: Metadata = {
  title: "ADMIN || Bildirishnomalar",
  description: " ",
};

const GamesPage = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-7xl">
        <Breadcrumb pageName="Birdirishnomalar" />
        <NotiveBox />
      </div>
    </DefaultLayout>
  );
};

export default GamesPage;
