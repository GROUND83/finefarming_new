import Link from "next/link";
import type { Metadata } from "next";

import React from "react";

import LogoWrap from "@/components/logowrap";
import Footer from "@/components/footerWrap";
import { isMobile } from "@/lib/isMobile";
import { headers } from "next/headers";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const userAgent = headers().get("user-agent") || "";
  const mobileCheck = isMobile(userAgent);
  console.log("userAgent", userAgent, mobileCheck);
  return (
    <div className="w-full  ">
      <div className="w-full  ">{children}</div>
    </div>
  );
}
