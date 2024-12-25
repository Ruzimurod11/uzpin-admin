// "use client";run
// import "jsvectormap/dist/css/jsvectormap.css";
// import "flatpickr/dist/flatpickr.min.css";
import "@/css/satoshi.css";
import "@/css/style.css";
import React, { useEffect, useState } from "react";
import Loader from "@/components/common/Loader";
import Head from "next/head";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const [loading, setLoading] = useState<boolean>(true);

  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>
        {/* {loading ? <Loader /> : children} */}
        {children}
      </body>
    </html>
  );
}
