import DefaultLayout from "@/components/Layouts/DefaultLaout";
import ConfirmBalansBox from "@/components/ConfirmBalans";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Kirim Chiqim",
};
const ConfirmBalans = () => {
  return (
    <DefaultLayout>
      <ConfirmBalansBox />
    </DefaultLayout>
  );
};

export default ConfirmBalans;
