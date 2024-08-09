"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface farmDetailProps {
  children: React.ReactNode;
  params: { id: string };
}
export default function LayOut({ children, params }: farmDetailProps) {
  const pathname = usePathname();
  return (
    <div className="relative  flex flex-col items-start flex-1  h-full w-full ">
      <div className=" border-b  bg-white  w-full   px-6  flex flex-col items-start gap-4 h-[50px] ">
        <div className="flex flex-row items-center gap-2 text-sm h-full">
          <Button asChild size={"sm"} variant={"ghost"}>
            <Link
              href={`/admin/farm`}
              className={`flex flex-row items-center gap-2`}
            >
              <ChevronLeft />
              <p>업체리스트</p>
            </Link>
          </Button>

          <Button asChild size={"sm"} variant={"ghost"}>
            <Link
              href={`/admin/farm/${params.id}/base`}
              className={`${
                pathname === `/admin/farm/${params.id}/base`
                  ? "bg-primary text-white hover:bg-primary/80"
                  : "bg-white  hover:bg-neutral-100"
              }`}
            >
              기본정보
            </Link>
          </Button>
          {/* <Button asChild size={"sm"} variant={"ghost"}>
            <Link
              href={`/admin/farm/${params.id}/image`}
              className={`${
                pathname === `/admin/farm/${params.id}/image`
                  ? "bg-primary text-white hover:bg-primary/80"
                  : "bg-white  hover:bg-neutral-100"
              }`}
            >
              사진정보
            </Link>
          </Button> */}
          <Button asChild size={"sm"} variant={"ghost"}>
            <Link
              href={`/admin/farm/${params.id}/facilities`}
              className={`${
                pathname === `/admin/farm/${params.id}/facilities`
                  ? "bg-primary text-white hover:bg-primary/80"
                  : "bg-white  hover:bg-neutral-100"
              }`}
            >
              시설 체험 정보
            </Link>
          </Button>
          <Button asChild size={"sm"} variant={"ghost"}>
            <Link
              href={`/admin/farm/${params.id}/opentime`}
              className={`${
                pathname === `/admin/farm/${params.id}/opentime`
                  ? "bg-primary text-white hover:bg-primary/80"
                  : "bg-white  hover:bg-neutral-100"
              }`}
            >
              운영정보
            </Link>
          </Button>
          <Button asChild size={"sm"} variant={"ghost"}>
            <Link
              href={`/admin/farm/${params.id}/policy`}
              className={`${
                pathname === `/admin/farm/${params.id}/policy`
                  ? "bg-primary text-white hover:bg-primary/80"
                  : "bg-white  hover:bg-neutral-100"
              }`}
            >
              취소 환불 정책
            </Link>
          </Button>
        </div>
      </div>
      <ScrollArea className="flex flex-col items-start w-full h-[calc(100vh-120px)]  ">
        {children}
      </ScrollArea>
    </div>
  );
}
