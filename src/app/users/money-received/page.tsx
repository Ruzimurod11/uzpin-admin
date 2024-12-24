import DefaultLayout from "@/components/Layouts/DefaultLaout";
import MoneyReceived from "@/components/MoneyReceived";
import { Metadata } from "next";
import { Suspense } from "react";
export const metadata: Metadata = {
  title: "Foydalanuvchi Kirim Chiqim",
};
const MoneyRecived = () => {
  return (
    <DefaultLayout>
      <Suspense fallback={<p>Yuklanmoqda...</p>}>
        <MoneyReceived />
      </Suspense>
    </DefaultLayout>
  );
};

export default MoneyRecived;
