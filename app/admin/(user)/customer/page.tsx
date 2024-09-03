import { DataTableComponent } from "@/components/table/tableComponent";

import { getMoreData } from "./actions";
import { columns } from "./components/colums";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { DataTableComponentAccount } from "@/components/table/tableComponentAccount";

export default async function FarmerList() {
  return (
    <div className="w-full  ">
      <div className="w-full bg-white h-[50px] flex flex-row items-center px-3 border-b">
        <Button asChild size={"sm"}>
          <Link href={"/admin/customer/search"}>검색</Link>
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
