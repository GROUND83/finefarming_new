import Footer from "@/components/footerWrap";
import Image from "next/image";
import Link from "next/link";

import React from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full  overflow-x-hidden  h-screen flex flex-col items-start  justify-between">
      <main className=" w-full bg-white flex-1 flex flex-col items-center  ">
        {children}
      </main>
      <Footer />
    </div>
  );
}
