import Link from "next/link";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { headers } from "next/headers";
import { isMobile } from "@/lib/isMobile";
import { MobileTable } from "./_component/table/mobileTable";
import { DataTable } from "./_component/table/table";

//
export default async function Page() {
  const session = await getServerSession(authOptions);
  const userAgent = headers().get("user-agent") || "";
  const mobileCheck = isMobile(userAgent);

  return (
    <div className="  ">
      <div className="container mx-auto  p-3 flex flex-col items-start gap-3">
        <div className="w-full border rounded-md bg-white flex  flex-col lg:flex-row items-center justify-between gap-3">
          <div className="p-6 flex flex-col items-start  justify-start  gap-3">
            <h1 className=" font-bold text-2xl">내가 쓴글</h1>
            <p>내가 쓴 체험매칭 게시글을 확인하세요.</p>
          </div>
        </div>
        <div className="w-full">
          {mobileCheck ? (
            <div className="mt-3 lg:hidden">
              <MobileTable />
            </div>
          ) : (
            <div className="mt-3 xs:hidden sm:hidden md:hidden">
              <DataTable />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
