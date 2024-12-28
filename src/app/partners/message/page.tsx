import { Metadata } from "next";
import DefaultLayout from "@/components/Layouts/DefaultLaout";

import TableMessage from "@/components/Tables/TableMessage";

export const metadata: Metadata = {
  title: "Hamkorlar",
  description: "",
};
const MessagePage = () => {
  return (
    <DefaultLayout>
      <div className="mx-auto mt-10 max-w-7xl">
        <TableMessage />
      </div>
    </DefaultLayout>
  );
};

export default MessagePage;
