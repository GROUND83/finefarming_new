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
import { getCommunity, getMineMatch } from "./actions";
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
    let res = await getMineMatch(fetchDataOptions);
    console.log("data", res);

    return res;
  });

  return (
    <div className="w-full">
      {data?.rows && data?.rows?.length > 0 ? (
        <div className=" bg-white w-full flex flex-col items-start gap-2 ">
          {data?.rows.map((item, index) => {
            return (
              <Link
                href={`/match/${item.id}`}
                key={index}
                className=" border p-4 w-full flex flex-col items-start gap-3"
              >
                <p className="text-base text-pretty">{item.title}</p>

                <div className="flex flex-row items-center gap-2 justify-start">
                  <p className="text-sm text-neutral-500">
                    {dayjs(item.created_at).format("YYYY.MM.DD")}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      ) : (
        <div className=" bg-white w-full flex flex-col items-center gap-2 ">
          <p>게시글이 없습니다.</p>
        </div>
      )}
    </div>
  );
}
