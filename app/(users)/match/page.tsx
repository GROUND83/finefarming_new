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

export default async function Page() {
  const session = await getServerSession(authOptions);
  const userAgent = headers().get("user-agent") || "";
  const mobileCheck = isMobile(userAgent);
  return (
    <div className="  ">
      <div className="container mx-auto  p-3 flex flex-col items-start gap-3">
        <div className="w-full p-12 border rounded-md bg-neutral-100 flex  flex-col lg:flex-row items-center justify-between gap-3">
          <div className="flex flex-col items-start  justify-start  lg:h-[200px] gap-3">
            <h1 className=" font-bold text-2xl">체험 매칭 게시판</h1>
            <p>
              농장 체험이 필요하시다면 체험 매칭 게시판에 의뢰를 남겨보세요.
            </p>
            <div>
              <Button asChild>
                <Link href={"/match/new"}>글쓰기</Link>
              </Button>
            </div>
          </div>
          <div className="w-[300px] bg-white h-[200px]">
            <p>이미지</p>
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
