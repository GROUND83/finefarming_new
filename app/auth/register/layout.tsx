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
      <Script
        id=""
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
        !function(f,b,e,v,n,t,s)
{if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
n.queue=[];t=b.createElement(e);t.async=!0;
t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window, document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '4129010167376389');
fbq('track', 'PageView');
        `,
        }}
      />
    </div>
  );
}
