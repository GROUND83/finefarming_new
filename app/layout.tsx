import type { Metadata } from "next";
import { SessionProvider } from "next-auth/react";

import { Toaster } from "@/components/ui/toaster";
import { ReactQueryClientProvider } from "@/components/reactQuery/ClientProvider";
import Image from "next/image";
import Link from "next/link";
import getSession from "@/lib/session";
import { notFound } from "next/navigation";
import db from "@/lib/db";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import "dayjs/locale/ko";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import AuthProvider from "@/lib/next-auth";
dayjs.locale("ko");

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Seoul");

//
const inter = Inter({ subsets: ["latin"] });
declare global {
  interface Window {
    kakao: any;
    Kakao: any;
  }
}
export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // const isMobile = useMediaQuery({ maxWidth: 480 });
  // const isMobile = useIsMobile();

  return (
    <ReactQueryClientProvider>
      <html lang="ko">
        <body
          className={inter.className}
          style={{ fontSize: 16, margin: 0, padding: 0 }}
        >
          {/* <Script
            strategy="beforeInteractive"
            src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_MAP_KEY}&libraries=services&autoload=false`}
          /> */}
          <AuthProvider>
            <div className="w-screen  flex flex-col  items-stretch bg-white relative min-h-screen">
              {children}
            </div>
          </AuthProvider>
          <Toaster />
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
