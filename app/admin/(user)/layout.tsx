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
          title="사용자 관리"
          sub="농장주, 매거진 작가, 고객, 관리자를 관리할 수 있습니다."
          newbutton={false}
          searchbutton={true}
          url="user"
        />
      </div>
      <div className="  px-3  w-full  h-[70px] flex flex-row  items-center justify-start top-[70px]  fixed border-b  bg-white gap-3">
        <Link
          href={"/admin/farmer"}
          className={
            pathname.includes("/admin/farmer")
              ? "bg-primary text-white px-3 py-1 rounded-md font-light text-sm"
              : "bg-neutral-100 text-neutral-500 px-3 py-1 rounded-md border text-sm"
          }
        >
          농장주
        </Link>
        <Link
          href={"/admin/writer"}
          className={
            pathname.includes("/admin/writer")
              ? "bg-primary text-white px-3 py-1 rounded-md font-light text-sm "
              : "bg-neutral-100 text-neutral-500 px-3 py-1 rounded-md border text-sm"
          }
        >
          매거진 작가
        </Link>
        <Link
          href={"/admin/customer"}
          className={
            pathname.includes("/admin/customer")
              ? "bg-primary text-white px-3 py-1 rounded-md font-light text-sm"
              : "bg-neutral-100 text-neutral-500 px-3 py-1 rounded-md border text-sm"
          }
        >
          고객
        </Link>
        <Link
          href={"/admin/manager"}
          className={
            pathname.includes("/admin/manager")
              ? "bg-primary text-white px-3 py-1 rounded-md font-light text-sm"
              : "bg-neutral-100 text-neutral-500 px-3 py-1 rounded-md border text-sm"
          }
        >
          관리자
        </Link>
      </div>

      <div className=" flex flex-col items-start w-full mt-[140px]">
        {children}
      </div>
    </div>
  );
}
