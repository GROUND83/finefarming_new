"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import SubTop from "@/components/subTop";

export default function LayOut({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-stretch   relative w-full  h-full  ">
      <div className="w-full    ">
        <SubTop
          title="사이트 관리"
          sub=" 체험품종,교육주제,구비시설,도구복장,정책관련 데이터를 관리합니다."
          newbutton={false}
          searchbutton={false}
          url="setting"
        />
      </div>

      <div className=" w-full  flex-1 ">{children}</div>
    </div>
  );
}
