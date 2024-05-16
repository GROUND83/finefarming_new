import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { MobileUserComponet, UserComponet } from "./_components/userComponet";
import React from "react";
import AuthProvider from "@/lib/next-auth";
import LogoWrap from "@/components/logowrap";

export const metadata: Metadata = {
  title: "파인파밍",
  description:
    "우리는 농업체험을 선택하는데 필요한 지식을 제공하는 동시에 여러분의 체험활동이 기억에 남고 유익한 추억이 될 수 있도록 돕습니다.",
  other: {
    "naver-site-verification": "891e21064b72d582235c53163a400fc58e244be6",
  },
};

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
