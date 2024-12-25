import GeneralInfoCreateBox from "@/components/GeneralInfoCreateBox";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Malumot Qo'shish",
};
const GeneralInfoCreatePage = () => {
  return (
    <DefaultLayout>
      <Suspense fallback={<p>Yuklanmoqda...</p>}>
        <GeneralInfoCreateBox />
      </Suspense>
    </DefaultLayout>
  );
};

export default GeneralInfoCreatePage;
