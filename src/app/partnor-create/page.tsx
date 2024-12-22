import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { Suspense } from "react";
import PartnorCreateBox from "@/components/PartnorCreateBox";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Hamkor Qo'shish",
};
const GamesCreatePage = () => {
  return (
    <DefaultLayout>
      <Suspense fallback={<p>Yuklanmoqda...</p>}>
        <PartnorCreateBox />
      </Suspense>
    </DefaultLayout>
  );
};

export default GamesCreatePage;
