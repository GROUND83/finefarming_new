import { Prisma } from "@prisma/client";
import Search from "./components/search/search";

import NewFarmer from "./components/new/newData";
import { DataTableComponent } from "@/components/table/tableComponent";
import { getMoreData } from "./actions";
import { columns } from "./components/colums";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { DataTableComponentAccount } from "@/components/table/tableComponentAccount";

export default async function FarmerList() {
  return (
    <div className="w-full  flex flex-col items-start flex-1 ">
      <div className="w-full bg-white h-[50px] flex flex-row items-center px-3 border-b">
        <Button asChild size={"sm"}>
          <Link href={"/admin/farmer/search"}>검색</Link>
        </Button>
      </div>
      <DataTableComponentAccount
        getdata={getMoreData}
        columns={columns}
        height="h-[calc(100vh-240px)]"
      />
    </div>
  );
}
