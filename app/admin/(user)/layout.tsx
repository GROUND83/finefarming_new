"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ScrollArea } from "@/components/ui/scroll-area";
import SubTop from "@/components/subTop";
import NewFarmer from "./farmer/components/new/newData";

//
export default function LayOut({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="flex flex-col items-start    w-full h-full  ">
      <div className="flex flex-col border-b h-[70px]  w-full  justify-center bg-white">
        <div className="flex flex-row  items-center justify-between   px-3   w-full ">
          <div className=" ">
            <h1 className="font-semibold  text-md">사용자 관리</h1>
            <p className="text-neutral-500 text-sm ">
              농장주, 매거진 작가, 고객, 관리자를 관리할 수 있습니다.
            </p>
          </div>
          <div className="flex flex-row items-center gap-3">
            {pathname === "/admin/farmer" && <NewFarmer />}
          </div>
        </div>
      </div>

      <div className="  px-3  w-full flex flex-row  items-center justify-start    border-b  bg-white h-[70px] gap-3">
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

      <div className=" flex flex-col items-start w-full  h-[calc(100vh-140px)]">
        {children}
      </div>
    </div>
  );
}
