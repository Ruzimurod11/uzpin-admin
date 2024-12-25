import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import TableTgGeneral from "@/components/Tables/TableTgGeneral";

export const metadata: Metadata = {
  title: "Ummumiy Ma'lumotlar",
  description: "",
};
const PartnorPage = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto max-w-7xl">
        <TableTgGeneral />
      </div>
    </DefaultLayout>
  );
};

export default PartnorPage;
