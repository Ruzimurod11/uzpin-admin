import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableCard from "@/components/Tables/TableCard";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Karta Qo'shish",
  description: " ",
};

const CardPage = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-7xl">
        {/* <Breadcrumb pageName="Karta Qo'shish" /> */}
        <TableCard />
        {/* <div className="flex justify-end">
          <Link
            href="addcard"
            className="my-4 flex w-20 justify-center rounded bg-green-400 px-5 py-1 text-2xl text-white"
          >
            +
          </Link>
        </div> */}
      </div>
    </DefaultLayout>
  );
};

export default CardPage;
