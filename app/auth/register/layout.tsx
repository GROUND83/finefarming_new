import Footer from "@/components/footerWrap";
import Image from "next/image";
import Link from "next/link";
import Script from "next/script";

import React, { Suspense } from "react";

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="w-full  h-full">
      {children}
      <Script type="text/javascript" src="//wcs.naver.net/wcslog.js" />
      <Script id="transit" type="text/javascript">
        {`
            var _nasa={};
            if(window.wcs) _nasa["cnv"] = wcs.cnv("1","10");
            `}
      </Script>
    </div>
  );
}
