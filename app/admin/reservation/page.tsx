"use client";
import Link from "next/link";
import { DataTable } from "./_components/table/DataTable";
import { DataTableComponent } from "@/components/table/tableComponent";
import { getMoreData } from "./_components/actions/actions";
import { columns } from "./_components/table/columns";

export default function Page() {
  return (
    <div className="w-full p-3">
      {/* <DataTable /> */}
      <DataTableComponent
        getdata={getMoreData}
        columns={columns}
        height="h-[calc(100vh-120px)]"
      />
    </div>
  );
}
