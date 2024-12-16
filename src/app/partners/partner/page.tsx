import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import Link from "next/link";
import TablePartner from "@/components/Tables/TablePartner";

export const metadata: Metadata = {
  title: "Hamkorlar",
  description: "",
};
const PartnorPage = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-7xl">
        {/* <Breadcrumb pageName="Hamkorlar" /> */}
        <TablePartner />
        {/* <div className="flex w-full justify-end">
          <Link
            href="/partnor-create"
            className="my-4 flex w-20 justify-center rounded bg-green-400 px-5 py-1 text-2xl text-white"
          >
            +
          </Link>
        </div> */}
      </div>
    </DefaultLayout>
  );
};

export default PartnorPage;
