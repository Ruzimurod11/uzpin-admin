import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";

import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import CancelBalansBox from "@/components/CancelBalans";

export const metadata: Metadata = {
  title: "Bekor qilinganlar",
  description: "This is Next.js Form Layout page for NextAdmin Dashboard Kit",
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
