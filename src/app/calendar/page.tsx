import CalendarBox from "@/components/CalenderBox";
import DefaultLayout from "@/components/Layouts/DefaultLaout";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Statistika",
  description: "",
};

const CalendarPage = () => {
  return (
    <DefaultLayout>
      <CalendarBox />
    </DefaultLayout>
  );
};

export default CalendarPage;
