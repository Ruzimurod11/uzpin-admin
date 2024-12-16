import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableUser from "@/components/Tables/TableUser";
import Link from "next/link";
import TableTgGeneral from "@/components/Tables/TableTgGeneral";

export const metadata: Metadata = {
  title: "Ummumiy Ma'lumotlar",
  description: "",
};
const PartnorPage = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-7xl">
        {/* <Breadcrumb pageName="Ummumiy Ma'lumotlar" /> */}
        <TableTgGeneral />
        <div className="flex w-full justify-end">
          <Link
            href="/general-info-create"
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
