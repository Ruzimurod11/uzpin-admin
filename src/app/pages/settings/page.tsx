import DefaultLayout from "@/components/Layouts/DefaultLaout";
import SettingBoxes from "@/components/SettingBoxes";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sozlamalar",
  description: "",
};

const Settings = () => {
  return (
    <DefaultLayout>
      <SettingBoxes />
    </DefaultLayout>
  );
};

export default Settings;
