import DefaultLayout from "@/components/Layouts/DefaultLaout";
import UserEdit from "@/components/UserEdit";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Foydalanuvchi Ma'lumotlari",
};
const GamesCreatePage = () => {
  return (
    <DefaultLayout>
      <Suspense fallback={<p>Yuklanmoqda...</p>}>
        <UserEdit />
      </Suspense>
    </DefaultLayout>
  );
};

export default GamesCreatePage;
