"use client";

import { ScrollArea } from "@/components/ui/scroll-area";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import {
  DocumentMagnifyingGlassIcon,
  HomeIcon,
  ListBulletIcon,
} from "@heroicons/react/24/outline";
import { usePathname } from "next/navigation";

interface farmDetailProps {
  children: React.ReactNode;
  params: { id: string };
}
export default function LayOut({ children, params }: farmDetailProps) {
  const pathname = usePathname();
  return (
    <div className="relative  flex flex-col items-start flex-1  h-full w-full ">
      <div className=" border-b  bg-white  w-full   px-6  flex flex-col items-start gap-4 h-[70px] ">
        <div className="flex flex-row items-center gap-2 text-sm h-full">
          <Link
            href={`/dashfarmer/farm/${params.id}/base`}
            className={`px-3 py-1 rounded-sm  transition-colors ${
              pathname === `/dashfarmer/farm/${params.id}/base`
                ? "bg-primary text-white hover:bg-primary/80"
                : "bg-white  hover:bg-neutral-100"
            }`}
          >
            기본정보
          </Link>
          <Link
            href={`/dashfarmer/farm/${params.id}/image`}
            className={`px-3 py-1 rounded-sm  transition-colors ${
              pathname === `/dashfarmer/farm/${params.id}/image`
                ? "bg-primary text-white hover:bg-primary/80"
                : "bg-white  hover:bg-neutral-100"
            }`}
          >
            사진정보
          </Link>
          <Link
            href={`/dashfarmer/farm/${params.id}/facilities`}
            className={`px-3 py-1 rounded-sm  transition-colors ${
              pathname === `/dashfarmer/farm/${params.id}/facilities`
                ? "bg-primary text-white hover:bg-primary/80"
                : "bg-white  hover:bg-neutral-100"
            }`}
          >
            시설 체험 정보
          </Link>
          <Link
            href={`/dashfarmer/farm/${params.id}/opentime`}
            className={`px-3 py-1 rounded-sm  transition-colors ${
              pathname === `/dashfarmer/farm/${params.id}/opentime`
                ? "bg-primary text-white hover:bg-primary/80"
                : "bg-white  hover:bg-neutral-100"
            }`}
          >
            운영정보
          </Link>
          {/* <Link
            href={`/dashfarmer/farm/${params.id}/product`}
            className={`px-3 py-1 rounded-sm  transition-colors ${
              pathname.includes(`/dashfarmer/farm/${params.id}/product`)
                ? "bg-primary text-white hover:bg-primary/80"
                : "bg-white  hover:bg-neutral-100"
            }`}
          >
            상품리스트
          </Link> */}
          {/* <Link
            href={`/dashfarmer/farm/${params.id}/reservation`}
            className={`px-3 py-1 rounded-sm  transition-colors ${
              pathname === `/dashfarmer/farm/${params.id}/reservation`
                ? "bg-primary text-white hover:bg-primary/80"
                : "bg-white  hover:bg-neutral-100"
            }`}
          >
            예약정보
          </Link> */}
          <Link
            href={`/dashfarmer/farm/${params.id}/policy`}
            className={`px-3 py-1 rounded-sm  transition-colors ${
              pathname === `/dashfarmer/farm/${params.id}/policy`
                ? "bg-primary text-white hover:bg-primary/80"
                : "bg-white  hover:bg-neutral-100"
            }`}
          >
            취소 환불 정책
          </Link>
        </div>
      </div>
      <ScrollArea className="flex flex-col items-start w-full  h-[calc(100vh-140px)]  ">
        {children}
      </ScrollArea>
    </div>
  );
}
