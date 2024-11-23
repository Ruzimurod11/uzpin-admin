import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import AddBalansBox from "@/components/AddBalans";

export const metadata: Metadata = {
  title: "Balansni To'ldirish",
  description: "This is Next.js Form Layout page for NextAdmin Dashboard Kit",
};

const AddBalans = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Hisobni To'ldirish" />
      <AddBalansBox />
    </DefaultLayout>
  );
};

export default AddBalans;
