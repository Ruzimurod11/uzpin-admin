import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

export const metadata: Metadata = {
  title: "Karta Qo'shish",
  description: " ",
};

const GamesPage = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-7xl">
        <Breadcrumb pageName="Karta Qo'shish" />
        Karta Qo&apos;shish
      </div>
    </DefaultLayout>
  );
};

export default GamesPage;
