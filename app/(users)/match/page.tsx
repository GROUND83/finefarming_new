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
import Image from "next/image";
import SessionWrap from "./_component/sesssionWrap";

export const metadata: Metadata = {
  title: "단체체험 수요 매칭 - 파인파밍",
  description:
    "단체 농장체험이 필요하시다면 체험 매칭 게시판에 의뢰를 남겨보세요.",
  keywords: [
    "단체체험",
    "단체체험 수요",
    "농장체험 수요",
    "체험제안",
    "체험의뢰",
    "농장체험 의뢰",
    "농업체험 의뢰",
    "체험 희망수요",
    "농장체험 제안",
  ],
  alternates: {
    canonical: `https://www.finefarming.co.kr/match`,
  },
};
export default async function Page() {
  const session = await getServerSession(authOptions);
  const userAgent = headers().get("user-agent") || "";
  const mobileCheck = isMobile(userAgent);

  console.log("session", session);
  //
  return (
    <div className="  ">
      <div className="container mx-auto  p-3 flex flex-col items-start gap-3">
        <div className="w-full border rounded-md bg-white flex  flex-col lg:flex-row items-center justify-between gap-3">
          <div className="p-6 flex flex-col items-start  justify-start h-[200px] gap-3">
            <h1 className=" font-bold text-2xl">체험 매칭 게시판</h1>
            <p>
              농장 체험이 필요하시다면 체험 매칭 게시판에 의뢰를 남겨보세요.
            </p>
            <SessionWrap />
            {/* <div className="flex flex-row items-center gap-3">
              {session?.user?.role === "user" ? (
                <div>
                  <Button asChild>
                    <Link href={"/match/new"}>글쓰기</Link>
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col  items-start gap-3">
                  <p className="text-sm">
                    회원전용 게시판입니다. 회원가입 후 이용하세요.
                  </p>
                  <Button asChild>
                    <Link href={"/auth/register"}>회원가입</Link>
                  </Button>
                </div>
              )}
              {session?.user?.role === "user" && (
                <Button variant={"backdelete"} asChild>
                  <Link href={"/match/mine"}>내가 쓴글</Link>
                </Button>
              )}
            </div> */}
          </div>
          <div className="w-[250px] bg-white p-3 ">
            <Image
              src={
                "https://tbucqnuyvwwhuqebboev.supabase.co/storage/v1/object/public/finefarming/match/match.jpg"
              }
              priority
              width={200}
              height={200}
              alt="단체이미지"
              className=" object-cover w-full aspect-square  "
            />
          </div>
        </div>

        <div className="w-full">
          {mobileCheck ? (
            <div className="mt-3 lg:hidden">
              <MobileTable />
            </div>
          ) : (
            <div className="mt-3 xs:hidden sm:hidden md:hidden">
              <DataTable />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
