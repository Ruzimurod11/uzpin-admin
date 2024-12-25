import DefaultLayout from "@/components/Layouts/DefaultLaout";
import ConfirmBalansBox from "@/components/ConfirmBalans";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Kirim Chiqim",
};
const ConfirmBalans = () => {
  return (
    <DefaultLayout>
      <Suspense fallback={<p>Yuklanmoqda...</p>}>
        <ConfirmBalansBox />
      </Suspense>
    </DefaultLayout>
  );
};

export default ConfirmBalans;
