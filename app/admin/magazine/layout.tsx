"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import SubTop from "@/components/subTop";
import DefaultLayOut from "../_component/defaultLayOut";

export default function LayOut({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <DefaultLayOut
      title="매거진관리"
      sub="등록된 매거진을 관리하세요."
      searchbutton={true}
      newbutton={false}
      url="magazine"
    >
      <div className=" flex flex-col items-start w-full  ">{children}</div>
    </DefaultLayOut>
  );
}
