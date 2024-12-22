import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Link from "next/link";
import TablePartner from "@/components/Tables/TablePartner";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Hamkorlar",
  description: "",
};
const PartnorPage = () => {
  return (
    <DefaultLayout>
      <Suspense fallback={<div>Yuklanmoqda...</div>}>
        <div className="mx-auto max-w-7xl">
          <TablePartner />
        </div>
      </Suspense>
    </DefaultLayout>
  );
};

export default PartnorPage;
