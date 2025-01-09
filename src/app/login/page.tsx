import React from "react";
import { Metadata } from "next";
import Signin from "@/components/Auth";

export const metadata: Metadata = {
  title: "Kirish",
  description: "",
};

const SignIn: React.FC = () => {
  return (
    <div className="flex h-screen flex-col items-center justify-center rounded-[10px] bg-white shadow-1 dark:bg-gray-dark dark:shadow-card">
      <div className="m-auto w-1/2">
        <div className="flex flex-wrap items-center">
          <div className="w-full">
            <div className="w-full p-4 sm:p-12.5 xl:p-15">
              <Signin />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
