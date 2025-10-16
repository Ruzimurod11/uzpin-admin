import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { Metadata } from "next";

import TablePartner from "@/components/Tables/TablePartner";

export const metadata: Metadata = {
  title: "Hamkorlar",
  description: "",
};
const PartnorPage = () => {
  return (
    <DefaultLayout>
      <TablePartner />
    </DefaultLayout>
  );
};

export default PartnorPage;
