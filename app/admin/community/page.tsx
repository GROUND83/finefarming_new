"use client";

import React from "react";
import { DataTableComponent } from "@/components/table/tableComponent";
import { getMoreData } from "./_component/table/actions";
import { columns } from "./_component/table/colums";

export default function Page() {
  return (
    <div className="w-full ">
      <div>
        <DataTableComponent
          getdata={getMoreData}
          columns={columns}
          height="h-[calc(100vh-120px)]"
        />
      </div>
    </div>
  );
}
