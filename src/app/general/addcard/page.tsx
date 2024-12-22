import AddCardBox from "@/components/AddCardBox";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Karta Qo'shish",
};
const AddCardPage = () => {
  return (
    <DefaultLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <AddCardBox />
      </Suspense>
    </DefaultLayout>
  );
};

export default AddCardPage;
