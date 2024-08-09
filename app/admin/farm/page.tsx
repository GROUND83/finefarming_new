"use client";

import { DataTableComponent } from "@/components/table/tableComponent";
import { getMoreData } from "./_components/table/actions";
import { columns } from "./_components/table/colums";

export default function FarmerList() {
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
