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
        <div className="mx-auto max-w-7xl">
          <UserEdit />
        </div>
      </Suspense>
    </DefaultLayout>
  );
};

export default GamesCreatePage;
