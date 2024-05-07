import { BuildingStorefrontIcon, UserIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function WriterLayOut({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full flex flex-row items-start">
      <div className="py-6 border-r-[1px]  bg-white  w-[180px] h-screen fixed top-0 left-0">
        <div className=" flex flex-col items-start gap-6 w-full px-6 ">
          <Link href={"/"} className="px-3">
            <div className=" relative  w-[80px] aspect-[5/3]">
              <Image src="/logo.svg" alt="logo" fill priority />
            </div>
          </Link>
          <div className="w-full">
            <p className="text-sm border-primary border  text-primary w-full p-2 flex flex-col items-center justify-center ">
              매거진 작가
            </p>
          </div>
          <div className="flex flex-col items-start gap-2  text-black  font-light text-sm w-full">
            <Link
              href={"/dashbordWriter/magazine"}
              className="w-full  py-3 px-3 flex flex-row items-center gap-2  hover:bg-neutral-100  transition-colors"
            >
              <BuildingStorefrontIcon className="size-4" />
              매거진 관리
            </Link>
            <Link
              href={"/dashbordWriter/profile"}
              className="w-full  py-3 px-3 flex flex-row items-center gap-2  hover:bg-neutral-100  transition-colors"
            >
              <UserIcon className="size-4" />
              프로필
            </Link>
          </div>
        </div>
      </div>
      <div className="ml-[180px] w-full flex-1  ">{children}</div>
    </div>
  );
}
