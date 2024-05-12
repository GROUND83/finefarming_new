import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import { ReactQueryClientProvider } from "@/components/reactQuery/ClientProvider";
import { Roboto, Noto_Sans_KR } from "next/font/google";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import "dayjs/locale/ko";
import dayjs from "dayjs";
import "dayjs/locale/ko";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import AuthProvider from "@/lib/next-auth";
import { cn } from "@/lib/utils";
dayjs.locale("ko");
dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.tz.setDefault("Asia/Seoul");

const notoSansKr = Noto_Sans_KR({
  // preload: true, 기본값
  subsets: ["latin"], // 또는 preload: false
  weight: ["100", "400", "700"],
});
const roboto = Roboto({
  subsets: ["latin"], // preload에 사용할 subsets입니다.
  weight: ["100", "400", "700"],
  variable: "--roboto", // CSS 변수 방식으로 스타일을 지정할 경우에 사용합니다.
});
//

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
          className={cn(notoSansKr.className, roboto.variable)}
          style={{ fontSize: 16, margin: 0, padding: 0 }}
        >
          <Script
            strategy="beforeInteractive"
            src={`https://dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.KAKAO_MAP_KEY}&libraries=services&autoload=false`}
          />
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
