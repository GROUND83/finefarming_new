"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SearchIcon } from "lucide-react";
import SubTop from "@/components/subTop";

export default function LayOut({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="relative  flex flex-col items-start flex-1  h-screen w-full ">
      <SubTop
        title="커뮤니티 관리"
        sub=" 공지사항 및 유저간에 커뮤니티를 관리할 수 있습니다."
        newbutton={true}
        searchbutton={true}
        url="community"
      />

      <div className=" flex flex-col items-start w-full mt-[70px] ">
        {children}
      </div>
    </div>
  );
}
