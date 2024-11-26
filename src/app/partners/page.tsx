import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableUser from "@/components/Tables/TableUser";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Hamkorlar",
  description: "",
};
const PartnorPage = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-7xl">
        <Breadcrumb pageName="Hamkorlar" />
        <TableUser />
        <div className="flex w-full justify-end">
          <Link
            href="games-create"
            className="my-4 flex w-20 justify-center rounded bg-green-400 px-5 py-1 text-2xl text-white"
          >
            +
          </Link>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default PartnorPage;
