"use client";

import { DataTableComponent } from "@/components/table/tableComponent";
import { columns } from "./_component/table/colums";
import { getMoreData } from "./_component/table/actions";
import { useSession } from "next-auth/react";
//
export default function Page() {
  const { data: session } = useSession();
  return (
    <div className="w-full   p-3 flex-1 flex flex-col  h-full">
      <DataTableComponent
        getdata={getMoreData}
        columns={columns}
        height="h-[calc(100vh-120px)]"
      />
    </div>
  );
}
