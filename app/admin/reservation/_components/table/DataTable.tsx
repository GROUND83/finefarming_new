"use client";

import * as React from "react";
import moment from "moment";
import {
  PaginationState,
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

import { getMoreData } from "./actions";
import { columns } from "./columns";

export interface TableDataType {
  id: number;
  reservationNumber: string | null;
  farm: { name: string | null } | null;
  user: { username: string | null } | null;
  checkInDate: Date | null;
  status: string | null;
  created_at: Date | null;
}

export function DataTable() {
  const [{ pageIndex, pageSize }, setPagination] =
    React.useState<PaginationState>({
      pageIndex: 0, //initial page index
      pageSize: 7, //default page size
    });
  const [sorting, setSorting] = React.useState<SortingState>([]);

  //
  const fetchDataOptions = {
    pageIndex,
    pageSize,
  };
  const dataQuery = useQuery(
    ["data", fetchDataOptions],
    async () => {
      let result = await getMoreData(fetchDataOptions);
      console.log("result", result);
      return result;
    }
    // { keepPreviousData: true }
  );

  const defaultData = React.useMemo(() => [], []);

  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );
  const table = useReactTable({
    data: dataQuery.data?.rows ?? defaultData,
    columns: columns as any,
    pageCount: dataQuery.data?.pageCount ?? -1,
    onSortingChange: setSorting,
    state: {
      sorting,
      pagination,
    },
    onPaginationChange: setPagination,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,

    debugTable: true,
  });

  return (
    <div className="w-full ">
      <div className="rounded-md border bg-white  w-full">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-neutral-400  font-light">
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
      </div>
    </div>
  );
}
