"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function LayOut({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="relative  flex flex-row items-start h-screen  ">
      <div className=" border-r  bg-white   px-3 py-6  w-[140px] h-screen flex flex-col items-start gap-6  fixed">
        <div className=" flex flex-col items-start  w-full  mt-26">
          <h1 className="font-semibold text-md">주문 관리</h1>
          <p className="text-neutral-500  text-xs">
            예약건을 조회하고 관리할 수 있습니다.
          </p>
        </div>
        {/* <div className="  bg-white  w-full    flex flex-col items-start gap-3 ">
          <Link
            href={"/admin/setting/refund"}
            className={
              pathname.includes("/admin/setting/refund")
                ? "bg-primary text-white px-3 py-1 rounded-md font-light text-xs"
                : "bg-neutral-100 text-neutral-500 px-3 py-1 rounded-md border text-xs"
            }
          >
            취소 및 환불 정책
          </Link>
          <Link
            href={"/admin/setting/personalpolicy"}
            className={
              pathname.includes("/admin/setting/personalpolicy")
                ? "bg-primary text-white px-3 py-1 rounded-md font-light text-xs"
                : "bg-neutral-100 text-neutral-500 px-3 py-1 rounded-md border text-xs"
            }
          >
            개인 정보 처리방침
          </Link>
          <Link
            href={"/admin/setting/servicepolicy"}
            className={
              pathname.includes("/admin/setting/servicepolicy")
                ? "bg-primary text-white px-3 py-1 rounded-md font-light text-xs"
                : "bg-neutral-100 text-neutral-500 px-3 py-1 rounded-md border text-xs"
            }
          >
            서비스 이용약관
          </Link>
          <Link
            href={"/admin/setting/farmitem"}
            className={
              pathname.includes("/admin/setting/farmitem")
                ? "bg-primary text-white px-3 py-1 rounded-md font-light text-xs"
                : "bg-neutral-100 text-neutral-500 px-3 py-1 rounded-md border text-xs"
            }
          >
            체험 품종
          </Link>
          <Link
            href={"/admin/setting/education"}
            className={
              pathname.includes("/admin/setting/education")
                ? "bg-primary text-white px-3 py-1 rounded-md font-light text-xs"
                : "bg-neutral-100 text-neutral-500 px-3 py-1 rounded-md border text-xs"
            }
          >
            교육 주제
          </Link>
          <Link
            href={"/admin/setting/facilities"}
            className={
              pathname.includes("/admin/setting/facilities")
                ? "bg-primary text-white px-3 py-1 rounded-md font-light text-xs"
                : "bg-neutral-100 text-neutral-500 px-3 py-1 rounded-md border text-xs"
            }
          >
            구비 시설
          </Link>
          <Link
            href={"/admin/setting/tools"}
            className={
              pathname.includes("/admin/setting/tools")
                ? "bg-primary text-white px-3 py-1 rounded-md font-light text-xs"
                : "bg-neutral-100 text-neutral-500 px-3 py-1 rounded-md border text-xs"
            }
          >
            도구 복장
          </Link>
        </div> */}
      </div>
      <div className=" flex flex-col items-start w-full ml-[140px] ">
        {children}
      </div>
    </div>
  );
}
