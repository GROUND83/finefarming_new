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
import { getMoreData } from "./actions";
import { columns } from "./colums";
import SubSectionWrap from "@/app/admin/_component/subSectionWrap";
import { getSession, useSession } from "next-auth/react";

type ownerType = {
  id: number;
  avatar: string;
  username: string;
  phone: string;
};
export type TableDataType = {
  id: number | null;
  name: string | null;
  address: string | null;
  visible: boolean | null;
  created_at: Date | null;
  initail: string | null;
  owner: ownerType | null;
  actions: string | null;
};

export function DataTable() {
  //
  const { data: session } = useSession();
  const [{ pageIndex, pageSize }, setPagination] =
    React.useState<PaginationState>({
      pageIndex: 0, //initial page index
      pageSize: 7, //default page size
    });

  const [sorting, setSorting] = React.useState<SortingState>([]);

  //
  const fetchDataOptions = async () => {
    const session = await getSession();
    console.log("session", session);
    return {
      pageIndex,
      pageSize,
      userId: session?.user.id,
    };
  };
  const { data, isLoading } = useQuery(["data"], async () => {
    const session = await getSession();
    console.log("session", session);
    let option = await fetchDataOptions();
    let data = await getMoreData(option);
    console.log("data", data);
    return data;
  });

  const defaultData = React.useMemo(() => [], []);

  const pagination = React.useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize]
  );

  const table = useReactTable({
    data: data?.rows ?? defaultData,
    columns: columns,
    pageCount: data?.pageCount ?? -1,
    onSortingChange: setSorting,
    state: {
      sorting,
      pagination,
    },
    onPaginationChange: setPagination,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    // debugTable: true,
  });

  return (
    <SubSectionWrap isLoading={isLoading}>
      <div className="rounded-md border bg-white ">
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
      <div className="flex flex-row items-center justify-end space-x-2 py-4 w-full px-3">
        <div className="flex-1  text-neutral-400  font-light">
          총 {data?.pageCount}개의 데이터가 있습니다.
        </div>
        {data?.pageCount! > 7 && (
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
    </SubSectionWrap>
  );
}
