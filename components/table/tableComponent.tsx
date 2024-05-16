"use client";
import * as React from "react";
import {
  PaginationState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  getPaginationRowModel,
} from "@tanstack/react-table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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

export function DataTableComponent({
  getdata,
  columns,
}: {
  getdata: any;
  columns: any;
}) {
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const dataQuery = useQuery(
    ["table", pagination],
    async () => await getdata(pagination)
    // { keepPreviousData: true }
  );

  const defaultData = React.useMemo(() => [], []);
  const table = useReactTable({
    data: dataQuery.data?.rows ?? defaultData,
    columns: columns as any,
    pageCount: dataQuery.data?.pageCount ?? 7,
    onSortingChange: setSorting,
    state: {
      sorting,
      pagination,
    },
    onPaginationChange: setPagination,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    // debugTable: true,
    manualPagination: true,
  });

  return (
    <div className="w-full ">
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-neutral-500  ">
          총 {dataQuery.data?.pageCount}개의 데이터가 있습니다.
        </div>
        <div className="flex flex-row items-center">
          <Select
            value={table.getState().pagination.pageSize.toString()}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="w-[80px]">
              <SelectValue placeholder="테이블 출력" />
            </SelectTrigger>
            <SelectContent>
              {[10, 20, 30, 40, 50].map((pageSize) => (
                <SelectItem key={pageSize} value={pageSize.toString()}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        {dataQuery.data?.pageCount && dataQuery.data?.pageCount > 7 ? (
          <div className="space-x-2 flex flex-row items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              이전
            </Button>

            <p className="border px-6 py-2 rounded-md text-sm text-neutral-500">
              {pagination.pageIndex + 1} /{" "}
              {Math.ceil(
                dataQuery.data?.pageCount! /
                  table.getState().pagination.pageSize
              )}
            </p>

            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={
                Math.round(
                  dataQuery.data?.pageCount! /
                    table.getState().pagination.pageSize
                ) <= pagination.pageIndex
              }
            >
              다음
            </Button>
          </div>
        ) : null}
      </div>
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
                  데이터가 없습니다.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
