import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import AddBalansBox from "@/components/AddBalans";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Balansni To'ldirish",
  description: "",
};

const AddBalans = () => {
  return (
    <DefaultLayout>
      {/* <Breadcrumb pageName="Hisobni To'ldirish" /> */}
      <Suspense fallback={<p>Yuklanmoqda...</p>}>
        <AddBalansBox />
      </Suspense>
    </DefaultLayout>
  );
};

export default AddBalans;
