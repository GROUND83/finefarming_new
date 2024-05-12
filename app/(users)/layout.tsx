import Image from "next/image";
import Link from "next/link";

import { MobileUserComponet, UserComponet } from "./_components/userComponet";
import React from "react";
import AuthProvider from "@/lib/next-auth";
import LogoWrap from "@/components/logowrap";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full  overflow-x-hidden ">
      <header className="w-full border-b-[1px] fixed top-0 left-0 h-[85px] bg-white z-50 sm:hidden md:hidden xs:hidden">
        <nav className=" flex flex-row items-center gap-12 justify-between h-full w-full container mx-auto">
          <div className="flex flex-row items-center gap-12 ">
            <LogoWrap />
            <div className="flex flex-row items-center gap-12">
              <Link
                href={"/product"}
                className="text-black hover:text-primary transition-colors delay-75"
              >
                농장체험
              </Link>
              <Link
                href={"/magazine"}
                className="text-black hover:text-primary transition-colors delay-75"
              >
                매거진
              </Link>
              <Link
                href={"/community"}
                className="text-black hover:text-primary transition-colors delay-75"
              >
                커뮤니티
              </Link>
            </div>
          </div>
          <div>
            <UserComponet />
          </div>
        </nav>
      </header>
      {/* 모바일 */}
      <header className="w-full  border-b-[1px]   fixed top-0 left-0 h-[70px] bg-white z-20  lg:hidden  ">
        <nav className=" flex flex-row items-center  justify-between h-full  px-6 ">
          <LogoWrap />
          <div className=" flex flex-row items-center gap-3">
            <MobileUserComponet />
          </div>
        </nav>
      </header>
      <main className="pt-[70px] lg:pt-[85px] w-full bg-white h-full  ">
        {children}
      </main>
    </div>
  );
}
