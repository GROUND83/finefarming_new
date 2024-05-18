"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import SubTop from "@/components/subTop";

export default function LayOut({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="flex flex-col items-start   relative w-full  h-full  ">
      <div className="w-full  relative  top-0 left-0">
        <SubTop
          title="사이트 관리"
          sub=" 체험품종,교육주제,구비시설,도구복장,정책관련 데이터를 관리합니다."
          newbutton={false}
          searchbutton={false}
          url="setting"
        />
      </div>

      <div className="  px-3  w-full  h-[70px] flex flex-row  items-center justify-start top-[70px]  fixed border-b  bg-white gap-3">
        <Link
          href={"/admin/setting/holidays"}
          className={
            pathname.includes("/admin/setting/holidays")
              ? "bg-primary text-white px-3 py-1 rounded-md font-light text-sm"
              : "bg-neutral-100 text-neutral-500 px-3 py-1 rounded-md border text-sm"
          }
        >
          공휴일 관리
        </Link>
        <Link
          href={"/admin/setting/refund"}
          className={
            pathname.includes("/admin/setting/refund")
              ? "bg-primary text-white px-3 py-1 rounded-md font-light text-sm"
              : "bg-neutral-100 text-neutral-500 px-3 py-1 rounded-md border text-sm"
          }
        >
          취소 및 환불 정책
        </Link>
        <Link
          href={"/admin/setting/personalpolicy"}
          className={
            pathname.includes("/admin/setting/personalpolicy")
              ? "bg-primary text-white px-3 py-1 rounded-md font-light text-sm"
              : "bg-neutral-100 text-neutral-500 px-3 py-1 rounded-md border text-sm"
          }
        >
          개인 정보 처리방침
        </Link>
        <Link
          href={"/admin/setting/servicepolicy"}
          className={
            pathname.includes("/admin/setting/servicepolicy")
              ? "bg-primary text-white px-3 py-1 rounded-md font-light text-sm"
              : "bg-neutral-100 text-neutral-500 px-3 py-1 rounded-md border text-sm"
          }
        >
          서비스 이용약관
        </Link>
        <Link
          href={"/admin/setting/farmitem"}
          className={
            pathname.includes("/admin/setting/farmitem")
              ? "bg-primary text-white px-3 py-1 rounded-md font-light text-sm"
              : "bg-neutral-100 text-neutral-500 px-3 py-1 rounded-md border text-sm"
          }
        >
          <div className="flex flex-row items-center gap-2">
            <p> 체험 품종 </p>
            <p> 구비시설 </p>
            <p> 도구복장</p>
          </div>
        </Link>
        <Link
          href={"/admin/setting/banner"}
          className={
            pathname.includes("/admin/setting/banner")
              ? "bg-primary text-white px-3 py-1 rounded-md font-light text-sm"
              : "bg-neutral-100 text-neutral-500 px-3 py-1 rounded-md border text-sm"
          }
        >
          <div className="flex flex-row items-center gap-2">
            <p>배너관리</p>
          </div>
        </Link>
      </div>
      <div className=" flex flex-col items-start w-full  flex-1 mt-[140px] ">
        {children}
      </div>
    </div>
  );
}
