"use client";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import Link from "next/link";

import { usePathname } from "next/navigation";
import React from "react";
import { getProductTitle } from "./_component/actions";

interface farmDetailProps {
  children: React.ReactNode;
  params: {
    productid: string;
  };
}
export default function LayOut({ children, params }: farmDetailProps) {
  // console.log(params);
  const [title, setTitle] = React.useState<string>();
  const pathname = usePathname();
  const gettitle = async () => {
    let res = await getProductTitle(Number(params.productid));
    console.log("res", res);
    if (res?.title) {
      setTitle(res.title);
    }
  };
  React.useEffect(() => {
    gettitle();
  }, [params.productid]);
  return (
    <>
      {pathname && (
        <div className="relative  flex flex-col items-start flex-1  h-full w-full  ">
          <div className="flex flex-row items-center w-full px-3  py-3  bg-white border-b h-[50px]">
            <div className="flex-1">
              <p>{title}</p>
            </div>
            <div className="px-6  flex flex-col items-start gap-4 ">
              <div className="flex flex-row items-center gap-2 text-sm h-full">
                <Button asChild size={"sm"} variant={"outline"}>
                  <Link
                    href={`/admin/product/${params.productid}/baseinfo`}
                    className={` ${
                      pathname.includes(`/${params.productid}/baseinfo`)
                        ? "bg-primary text-white hover:bg-primary/80"
                        : "bg-white  hover:bg-neutral-100"
                    }`}
                  >
                    기본정보
                  </Link>
                </Button>
                <Button asChild size={"sm"} variant={"outline"}>
                  <Link
                    href={`/admin/product/${params.productid}/image`}
                    className={`${
                      pathname.includes(
                        `/admin/product/${params.productid}/image`
                      )
                        ? "bg-primary text-white hover:bg-primary/80"
                        : "bg-white  hover:bg-neutral-100"
                    }`}
                  >
                    사진정보
                  </Link>
                </Button>
                <Button asChild size={"sm"} variant={"outline"}>
                  <Link
                    href={`/admin/product/${params.productid}/settingimage`}
                    className={`${
                      pathname.includes(
                        `/admin/product/${params.productid}/settingimage`
                      )
                        ? "bg-primary text-white hover:bg-primary/80"
                        : "bg-white  hover:bg-neutral-100"
                    }`}
                  >
                    사진세팅
                  </Link>
                </Button>
                <Button asChild size={"sm"} variant={"outline"}>
                  <Link
                    href={`/admin/product/${params.productid}/option`}
                    className={`${
                      pathname.includes(
                        `/admin/product/${params.productid}/option`
                      )
                        ? "bg-primary text-white hover:bg-primary/80"
                        : "bg-white  hover:bg-neutral-100"
                    }`}
                  >
                    옵션상품
                  </Link>
                </Button>
                <Button asChild size={"sm"} variant={"outline"}>
                  <Link
                    href={`/admin/product/${params.productid}/detail`}
                    className={`${
                      pathname.includes(
                        `/admin/product/${params.productid}/detail`
                      )
                        ? "bg-primary text-white hover:bg-primary/80"
                        : "bg-white  hover:bg-neutral-100"
                    }`}
                  >
                    상세페이지
                  </Link>
                </Button>
                <Button asChild size={"sm"} variant={"outline"}>
                  <Link
                    href={`/admin/product/${params.productid}/reservation`}
                    className={`${
                      pathname.includes(
                        `/admin/product/${params.productid}/reservation`
                      )
                        ? "bg-primary text-white hover:bg-primary/80"
                        : "bg-white  hover:bg-neutral-100"
                    }`}
                  >
                    예약관련
                  </Link>
                </Button>
                <Button asChild size={"sm"} variant={"outline"}>
                  <Link
                    href={`/admin/product/${params.productid}/event`}
                    className={`${
                      pathname.includes(
                        `/admin/product/${params.productid}/event`
                      )
                        ? "bg-primary text-white hover:bg-primary/80"
                        : "bg-white  hover:bg-neutral-100"
                    }`}
                  >
                    이벤트
                  </Link>
                </Button>
              </div>
            </div>
          </div>
          <ScrollArea className="flex flex-col items-start w-full  max-h-[calc(100vh-140px)] ">
            {children}
          </ScrollArea>
        </div>
      )}
    </>
  );
}
