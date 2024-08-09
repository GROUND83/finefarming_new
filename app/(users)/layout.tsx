import Link from "next/link";
import type { Metadata } from "next";
import { MobileUserComponet, UserComponet } from "./_components/userComponet";
import React from "react";

import LogoWrap from "@/components/logowrap";
import Footer from "@/components/footerWrap";
import { isMobile } from "@/lib/isMobile";
import { headers } from "next/headers";
import Script from "next/script";

export const metadata: Metadata = {
  title: "파인파밍",
  description:
    "우리는 농업체험을 선택하는데 필요한 지식을 제공하는 동시에 여러분의 체험활동이 기억에 남고 유익한 추억이 될 수 있도록 돕습니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userAgent = headers().get("user-agent") || "";
  const mobileCheck = isMobile(userAgent);
  console.log("userAgent", userAgent, mobileCheck);
  return (
    <div className="w-full  overflow-x-hidden ">
      {!mobileCheck ? (
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
                {/* <Link
                  href={"/recommand"}
                  className="text-black hover:text-primary transition-colors delay-75"
                >
                  월별체험
                </Link>
                <Link
                  href={"/match"}
                  className="text-black hover:text-primary transition-colors delay-75"
                >
                  체험매칭
                </Link> */}
              </div>
            </div>
            <UserComponet />
          </nav>
        </header>
      ) : (
        <header className="w-full  border-b-[1px]   fixed top-0 left-0 h-[70px] bg-white z-20  lg:hidden  ">
          <nav className=" flex flex-row items-center  justify-between h-full  px-6 ">
            <LogoWrap />
            <MobileUserComponet />
          </nav>
        </header>
      )}

      <main className="pt-[70px] lg:pt-[85px] w-full bg-white h-full  ">
        {children}
      </main>
      <Footer />
      <Script
        type="text/javascript"
        src="//wcs.naver.net/wcslog.js"
        strategy="beforeInteractive"
      />
      <Script id="common" strategy="beforeInteractive">
        {`
          if (!wcs_add) var wcs_add={};
          wcs_add["wa"] = "s_4e5f6329aa9e";
          if (!_nasa) var _nasa={};
          if(window.wcs){
          wcs.inflow("finefarming.co.kr");
          wcs_do(_nasa);
      }
        `}
      </Script>
    </div>
  );
}
