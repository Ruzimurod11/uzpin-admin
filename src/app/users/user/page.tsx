import React from "react";
import User from "@/components/User";
import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";

export const metadata: Metadata = {
  title: "Foydalanuvshilar",
  description: "This is Next.js Form Elements page for NextAdmin Dashboard Kit",
};

const UserPage = () => {
  return (
    <DefaultLayout>
      <User />
    </DefaultLayout>
  );
};

export default UserPage;
