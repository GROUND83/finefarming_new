import Image from "next/image";
import Link from "next/link";

import { MobileUserComponet, UserComponet } from "./_components/userComponet";
import React from "react";
import AuthProvider from "@/lib/next-auth";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-[100vw]  overflow-x-hidden ">
      <div className="w-full border-b-[1px] fixed top-0 left-0 h-[85px] bg-white z-50 sm:hidden">
        <div className=" flex flex-row items-center gap-12 justify-between h-full w-full px-12">
          <div className="flex flex-row items-center gap-12 ">
            <Link href={"/"}>
              <div className="flex flex-row items-center gap-12 relative w-[60px] h-[50px] ">
                <Image src="/logocolor.svg" alt="logo" fill priority />
              </div>
            </Link>
            <div className="flex flex-row items-center gap-12 mt-3">
              <Link
                href={"/product"}
                className="text-black hover:text-primary transition-colors delay-75"
              >
                농장체험 찾기
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
        </div>
      </div>
      {/* 모바일 */}
      <div className="w-full  border-b-[1px]   fixed top-0 left-0 h-[85px] bg-white z-20  md:hidden px-3 ">
        <div className=" flex flex-row items-center gap-12 justify-between h-full px-3">
          <Link href={"/"}>
            <div className="flex flex-row items-center gap-12 relative w-[80px] h-[50px] ">
              <Image src="/logocolor.svg" alt="logo" fill priority />
            </div>
          </Link>
          <div className="mt-3 flex flex-row items-center gap-3">
            <MobileUserComponet />
          </div>
        </div>
      </div>
      <div className="mt-[85px] w-full  bg-white ">{children}</div>
    </div>
  );
}
