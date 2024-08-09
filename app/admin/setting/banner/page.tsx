"use client";
import React from "react";
import { PlusIcon } from "@heroicons/react/24/outline";

import { Button } from "@/components/ui/button";
import { FormTitle } from "../../_component/form/form";
import { DataTableComponent } from "@/components/table/tableComponent";
import { getMoreData } from "./table/actions";
import { columns } from "./table/colums";
import Link from "next/link";

export default function Page() {
  const [updateloading, setUpdateLoading] = React.useState(false);

  return (
    <div className="w-full h-screen p-3">
      <div className="p-6 flex-1 border rounded-md  bg-white   flex flex-row items-center justify-between w-full  ">
        <div className="felx flex-col items-start w-full">
          <FormTitle title="배너" sub="메인페이지 배너를 관리하세요." />
        </div>
        <Button
          type="button"
          className="flex flex-row items-center gap-2"
          variant={"outline"}
          size={"sm"}
          asChild
        >
          <Link href={"/admin/setting/banner/new"}>
            <PlusIcon className="size-4" />
            배너 추가
          </Link>
        </Button>
      </div>
      <div className="w-full h-full  p-3">
        <DataTableComponent
          getdata={getMoreData}
          columns={columns}
          height="h-[calc(100vh-120px)]"
        />
      </div>
    </div>
  );
}
