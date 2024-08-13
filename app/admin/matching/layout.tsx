"use client";

import SubTop from "@/components/subTop";
import DefaultLayOut from "../_component/defaultLayOut";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusIcon, SearchIcon } from "lucide-react";

export default function LayOut({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-start   relative w-full  h-full  ">
      <div className="w-full  relative ">
        <div className="flex flex-col border-b h-[70px] justify-center   ] bg-white">
          <div className="flex flex-row  items-center justify-between   px-3   w-full ">
            <div className=" ">
              <h1 className="font-semibold  text-md">매칭 게시판 관리</h1>
              <p className="text-neutral-500 text-sm ">
                매칭 게시판 관리할 수 있습니다.
              </p>
            </div>
            <div className="flex flex-row items-center gap-3">
              <div>
                <Button
                  asChild
                  variant={"outline"}
                  size={"sm"}
                  className="flex flex-row items-center justify-center gap-3 "
                >
                  <Link href={`/admin/product/search`}>
                    <SearchIcon className="size-4" />
                    검색하기
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className=" flex flex-col items-start w-full  ">{children}</div>
    </div>
  );
}
