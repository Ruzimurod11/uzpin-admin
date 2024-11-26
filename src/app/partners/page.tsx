import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import Breadcrumb from "@/components/Breadcrumbs/Breadcrumb";
import TableUser from "@/components/Tables/TableUser";

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
      </div>
    </DefaultLayout>
  );
};

export default PartnorPage;
