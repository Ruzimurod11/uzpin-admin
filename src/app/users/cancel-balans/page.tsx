import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import CancelBalansBox from "@/components/CancelBalans";

export const metadata: Metadata = {
  title: "Bekor qilinganlar",
  description: "",
};

const CancelBalans = () => {
  return (
    <DefaultLayout>
      <Breadcrumb pageName="Bekor qilinganlar" />
      <CancelBalansBox />
    </DefaultLayout>
  );
};

export default CancelBalans;
