"use client";

import * as React from "react";

import {
  PaginationState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useQuery } from "react-query";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { columns } from "./colums";
import { getCommunity } from "./actions";
import { Badge } from "@/components/ui/badge";
import dayjs from "dayjs";
import Link from "next/link";

export function MobileTable() {
  //

  const [{ pageIndex, pageSize }, setPagination] =
    React.useState<PaginationState>({
      pageIndex: 0, //initial page index
      pageSize: 7, //default page size
    });

  const fetchDataOptions = {
    pageIndex,
    pageSize,
  };
  const { isLoading, data } = useQuery(["data", fetchDataOptions], async () => {
    let res = await getCommunity(fetchDataOptions);
    console.log("data", res);

    return res;
  });

  return (
    <div className="w-full">
      <div className=" bg-white w-full flex flex-col items-start gap-2 ">
        {data?.rows.map((item, index) => {
          return (
            <Link
              href={`/community/${item.id}`}
              key={index}
              className=" border p-4 w-full flex flex-col items-start gap-3"
            >
              <p className="text-base text-pretty">{item.title}</p>

              <div className="flex flex-row items-center gap-2 justify-start">
                {/* <p className="text-sm">{item.authorName}</p> */}
                <p className="text-sm text-neutral-500">
                  {dayjs(item.created_at).format("YYYY.MM.DD")}
                </p>
              </div>
              {/* <p className="text-sm">{item.content}</p> */}
            </Link>
          );
        })}
      </div>
      {/* <div className="flex flex-row items-center justify-end space-x-2 py-4 w-full px-3">
        <div className="flex-1  text-neutral-400  font-light">
          총 {dataQuery.data?.pageCount}개의 데이터가 있습니다.
        </div>
        {dataQuery.data?.pageCount! > 7 && (
          <div className="space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              이전
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={!table.getCanNextPage()}
            >
              다음
            </Button>
          </div>
        )}
      </div> */}
    </div>
  );
}
