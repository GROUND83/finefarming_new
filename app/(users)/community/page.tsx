import { Button } from "@/components/ui/button";
import {
  ChatBubbleLeftEllipsisIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { DataTable } from "./_component/table/table";
import React from "react";
import { getCommunity } from "./_component/table/actions";
import type { Metadata } from "next";
import { MobileTable } from "./_component/table/mobileTable";
import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { headers } from "next/headers";
import { isMobile } from "@/lib/isMobile";

export const metadata: Metadata = {
  title: "농업체험 정보공유 - 파인파밍",
  description: "파인파밍의 소식과 고객과의 커뮤니티 공간입니다.",
  keywords: [
    "파인파밍 공지사항",
    "파인파밍 체험문의",
    "파인파밍 오픈채팅방",
    "파인파밍 예약안내",
    "농업체험 정보공유",
  ],
  alternates: {
    canonical: `https://www.finefarming.co.kr/community`,
  },
};

export default async function Page() {
  const session = await getServerSession(authOptions);
  const userAgent = headers().get("user-agent") || "";
  const mobileCheck = isMobile(userAgent);
  return (
    <article className="w-full bg-white">
      <section className="w-full relative lg:container lg:mx-auto mt-3 px-3 lg:px-0 min-h-screen">
        <div className="w-full border-b lg:border-none px-6 py-3 flex flex-row items-center justify-between ">
          <div className="flex flex-row gap-2 items-center">
            <ChatBubbleLeftEllipsisIcon className="size-6" />
            <h1 className="text-lg lg:text-xl font-semibold">커뮤니티</h1>
          </div>
          {session && (
            <div>
              <Button asChild>
                <Link
                  href="/community/new"
                  className="flex flex-row items-center gap-2"
                >
                  <PlusIcon className="size-4" />
                  커뮤니터
                </Link>
              </Button>
            </div>
          )}
        </div>
        {mobileCheck ? (
          <div className="mt-3 lg:hidden">
            <MobileTable />
          </div>
        ) : (
          <div className="mt-3 xs:hidden sm:hidden md:hidden">
            <DataTable />
          </div>
        )}
      </section>
    </article>
  );
}
