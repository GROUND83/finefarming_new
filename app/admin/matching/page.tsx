"use client";
import { DataTableComponent } from "@/components/table/tableComponent";
import { columns } from "./_components/table/colums";
import { getMoreData } from "./_components/table/actions";
export default function Page() {
  return (
    <div className="w-full h-full">
      <DataTableComponent
        getdata={getMoreData}
        columns={columns}
        height="h-[calc(100vh-120px)]"
      />
    </div>
  );
}
