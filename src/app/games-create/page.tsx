import GamesBoxCreate from "@/components/GameBoxCreate";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "O'YINLAR QO'SHISH",
  description: "",
};

const GamesCreatePage = () => {
  return (
    <DefaultLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <GamesBoxCreate />
      </Suspense>
    </DefaultLayout>
  );
};

export default GamesCreatePage;
