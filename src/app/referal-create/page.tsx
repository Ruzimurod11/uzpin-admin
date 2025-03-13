import DefaultLayout from "@/components/Layouts/DefaultLaout";
import ReferalCreateBox from "@/components/ReferalCreateBox/index";
import React, { Suspense } from "react";

const ReferalCreatePage = () => {
  return (
    <DefaultLayout>
      <Suspense fallback={<p>Yuklanmoqda...</p>}>
        <ReferalCreateBox />
      </Suspense>
    </DefaultLayout>
  );
};

export default ReferalCreatePage;
