"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

import { usePathname } from "next/navigation";

interface farmDetailProps {
  children: React.ReactNode;
  params: {
    productid: string;
    id: string;
  };
}
export default function LayOut({ children, params }: farmDetailProps) {
  console.log(params);
  const pathname = usePathname();
  return (
    <>
      {pathname && (
        <div className="relative  flex flex-col items-start flex-1  h-full w-full  ">
          <div className="flex flex-row items-center w-full px-3  py-3  bg-white border-b h-[70px]">
            <div className="flex-1">
              <p>상품 정보</p>
            </div>
            <div className="px-6  flex flex-col items-start gap-4 ">
              <div className="flex flex-row items-center gap-2 text-sm h-full">
                <Link
                  href={`/dashfarmer/product/${params.productid}/baseinfo`}
                  className={`px-3 py-1 rounded-sm  transition-colors ${
                    pathname.includes(`/${params.productid}/baseinfo`)
                      ? "bg-primary text-white hover:bg-primary/80"
                      : "bg-white  hover:bg-neutral-100"
                  }`}
                >
                  기본정보
                </Link>
                <Link
                  href={`/dashfarmer/product/${params.productid}/option`}
                  className={`px-3 py-1 rounded-sm  transition-colors ${
                    pathname.includes(
                      `/dashfarmer/product/${params.productid}/option`
                    )
                      ? "bg-primary text-white hover:bg-primary/80"
                      : "bg-white  hover:bg-neutral-100"
                  }`}
                >
                  옵션상품
                </Link>
                <Link
                  href={`/dashfarmer/product/${params.productid}/detail`}
                  className={`px-3 py-1 rounded-sm  transition-colors ${
                    pathname.includes(
                      `/dashfarmer/product/${params.productid}/detail`
                    )
                      ? "bg-primary text-white hover:bg-primary/80"
                      : "bg-white  hover:bg-neutral-100"
                  }`}
                >
                  상세페이지
                </Link>
                <Link
                  href={`/dashfarmer/product/${params.productid}/reservation`}
                  className={`px-3 py-1 rounded-sm  transition-colors ${
                    pathname.includes(
                      `/dashfarmer/product/${params.productid}/reservation`
                    )
                      ? "bg-primary text-white hover:bg-primary/80"
                      : "bg-white  hover:bg-neutral-100"
                  }`}
                >
                  예약정보
                </Link>
                <Link
                  href={`/dashfarmer/product/${params.productid}/event`}
                  className={`px-3 py-1 rounded-sm  transition-colors ${
                    pathname.includes(
                      `/dashfarmer/product/${params.productid}/event`
                    )
                      ? "bg-primary text-white hover:bg-primary/80"
                      : "bg-white  hover:bg-neutral-100"
                  }`}
                >
                  이벤트
                </Link>
              </div>
            </div>
          </div>
          <ScrollArea className="flex flex-col items-start w-full  h-[calc(100vh-140px)] ">
            {children}
          </ScrollArea>
        </div>
      )}
    </>
  );
}
