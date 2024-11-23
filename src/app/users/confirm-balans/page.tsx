import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import ConfirmBalansBox from "@/components/ConfirmBalans";

export const metadata: Metadata = {
  title: "Balansni tekshirish",
  description: "",
};

const ConfirmBalans = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Tasdiqlangan Balans" />
      <ConfirmBalansBox />
    </DefaultLayout>
  );
};

export default ConfirmBalans;
