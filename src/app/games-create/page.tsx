import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import GamesBoxCreate from "@/components/GameBoxCreate";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "O'YINLAR QO'SHISH",
  description: "",
};

const GamesCreatePage = () => {
  return (
    <DefaultLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="mx-auto max-w-7xl">
          {/* <Breadcrumb pageName="O'yin Yaratish" /> */}
          <GamesBoxCreate />
        </div>
      </Suspense>
    </DefaultLayout>
  );
};

export default GamesCreatePage;
