"use client";

import DefaultLayOut from "@/app/admin/_component/defaultLayOut";
import SubTop from "@/components/subTop";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function LayOut({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-start   relative w-full  h-full  ">
      <div className="w-full  relative  top-0 left-0">
        <div className="flex flex-col border-b h-[70px] justify-center fixed   w-[calc(100vw-180px)] bg-white z-50">
          <div className="flex flex-row  items-center justify-between   px-3   w-full ">
            <div className=" ">
              <h1 className="font-semibold  text-md">매거진 관리</h1>
              <p className="text-neutral-500 text-sm ">
                매거진 등록 관리하세요.
              </p>
            </div>
            <div className="flex flex-row items-center gap-3">
              <Button asChild>
                <Link href={"/dashbordWriter/magazine/new"}>매거진 작성</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className=" flex flex-col items-start w-full  flex-1 mt-[70px] ">
        {children}
      </div>
    </div>
  );
}
