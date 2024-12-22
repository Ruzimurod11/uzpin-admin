import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableCard from "@/components/Tables/TableCard";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Plastik Kartalar",
  description: " ",
};

const CardPage = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-7xl">
        <TableCard />
      </div>
    </DefaultLayout>
  );
};

export default CardPage;
