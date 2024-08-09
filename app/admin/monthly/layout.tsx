"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

import DefaultLayOut from "../_component/defaultLayOut";

export default function LayOut({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <DefaultLayOut
      title="월별체험 상품관리"
      sub="월별체험 상품을 관리하세요."
      searchbutton={false}
      newbutton={true}
      url="magazine"
    >
      <div className=" flex flex-col items-start w-full  ">{children}</div>
    </DefaultLayOut>
  );
}
