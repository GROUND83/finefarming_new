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
              href={`/match/${item.id}`}
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
    </div>
  );
}
