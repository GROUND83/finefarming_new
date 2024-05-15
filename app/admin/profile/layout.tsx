"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import { SearchIcon } from "lucide-react";
import SubTop from "@/components/subTop";
import DefaultLayOut from "../_component/defaultLayOut";

export default function LayOut({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <DefaultLayOut
      title="프로필"
      sub="프로필을 관리합니다."
      searchbutton={false}
      newbutton={false}
      url="profile"
    >
      {children}
    </DefaultLayOut>
  );
}
