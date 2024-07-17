"use client";

import DefaultLayOut from "@/app/admin/_component/defaultLayOut";
import SubTop from "@/components/subTop";
import { Button } from "@/components/ui/button";
import { PlusIcon, SearchIcon } from "lucide-react";
import Link from "next/link";
import NewFarm from "./new/newData";
import NewProductModal from "./new/newProductModla";

export default function LayOut({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-start   relative w-full  h-full  ">
      <div className="flex flex-col border-b h-[70px] justify-center fixed   w-[calc(100vw-180px)] bg-white">
        <div className="flex flex-row  items-center justify-between   px-3   w-full ">
          <div className=" ">
            <h1 className="font-semibold  text-md">체험상품 관리</h1>
            <p className="text-neutral-500 text-sm ">체험상품을 관리하세요.</p>
          </div>
          <div className="flex flex-row items-center gap-3">
            <div>
              <Button
                asChild
                variant={"outline"}
                size={"sm"}
                className="flex flex-row items-center justify-center gap-3 "
              >
                <Link href={`/dashfarmer/product/search`}>
                  <SearchIcon className="size-4" />
                  검색하기
                </Link>
              </Button>
            </div>
            <div>
              <NewProductModal />
              {/* <Button
                asChild
                size={"sm"}
                className="flex flex-row items-center justify-center gap-3 "
              >
                <Link href={`/dashfarmer/product/new`}>
                  <PlusIcon className="size-4" />
                  체험상품
                </Link>
              </Button> */}
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
