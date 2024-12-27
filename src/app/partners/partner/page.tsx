import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";

import TablePartner from "@/components/Tables/TablePartner";
import { Suspense } from "react";
import TableMessage from "@/components/Tables/TableMessage";

export const metadata: Metadata = {
  title: "Hamkorlar",
  description: "",
};
const PartnorPage = () => {
  return (
    <DefaultLayout>
      {/* <Suspense fallback={<div>Yuklanmoqda...</div>}> */}
      <div className="mx-auto max-w-7xl">
        <TablePartner />
      </div>
      <div className="mx-auto mt-10 max-w-7xl">
        <TableMessage />
      </div>
      {/* </Suspense> */}
    </DefaultLayout>
  );
};

export default PartnorPage;
