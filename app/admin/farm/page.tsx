"use client";

import { DataTableComponent } from "@/components/table/tableComponent";
import { getMoreData } from "./_components/table/actions";
import { columns } from "./_components/table/colums";

export default async function FarmerList() {
  return (
    <div className="w-full h-full  p-3">
      <DataTableComponent getdata={getMoreData} columns={columns} />
    </div>
  );
}
