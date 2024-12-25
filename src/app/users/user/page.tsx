import React, { Suspense } from "react";
import User from "@/components/User";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";

export const metadata: Metadata = {
  title: "Foydalanuvshilar",
  description: "",
};

const UserPage = () => {
  return (
    <DefaultLayout>
      <Suspense fallback={<p>Yuklanmoqda...</p>}>
        <User />
      </Suspense>
    </DefaultLayout>
  );
};

export default UserPage;
