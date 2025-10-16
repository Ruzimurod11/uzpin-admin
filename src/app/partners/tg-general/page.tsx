import DefaultLayout from "@/components/Layouts/DefaultLaout";
import TableTgGeneral from "@/components/Tables/TableTgGeneral";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Ummumiy Ma'lumotlar",
  description: "",
};
const PartnorPage = () => {
  return (
    <DefaultLayout>
      <TableTgGeneral />
    </DefaultLayout>
  );
};

export default PartnorPage;
