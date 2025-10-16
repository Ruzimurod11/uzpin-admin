import DefaultLayout from "@/components/Layouts/DefaultLaout";
import TableCard from "@/components/Tables/TableCard";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Plastik Kartalar",
  description: " ",
};

const CardPage = () => {
  return (
    <DefaultLayout>
      <TableCard />
    </DefaultLayout>
  );
};

export default CardPage;
