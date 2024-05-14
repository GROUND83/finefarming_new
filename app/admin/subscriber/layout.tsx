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
      title="매일 구독 관리"
      sub="매일 구독자를 관리합니다."
      searchbutton={true}
      newbutton={false}
      url="review"
    >
      {children}
    </DefaultLayOut>
  );
}
