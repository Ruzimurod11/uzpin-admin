import DefaultLayout from "@/components/Layouts/DefaultLaout";
import NotiveBox from "@/components/NotiveBox";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "ADMIN || Bildirishnomalar",
  description: " ",
};

const GamesPage = () => {
  return (
    <DefaultLayout>
      <NotiveBox />
    </DefaultLayout>
  );
};

export default GamesPage;
