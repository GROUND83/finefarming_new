"use client";
import { DataTableComponent } from "@/components/table/tableComponent";
import { getMoreData } from "./_commponent/table/actions";
import { columns } from "./_commponent/table/colums";

export default function Page() {
  return (
    <div className="w-full p-3">
      <div>
        <DataTableComponent getdata={getMoreData} columns={columns} />
      </div>
    </div>
  );
}
