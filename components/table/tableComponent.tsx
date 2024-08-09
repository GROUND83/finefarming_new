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
import { ChevronLeft, ChevronRight, Loader2 } from "lucide-react";
import { ScrollArea } from "@radix-ui/react-scroll-area";

export function DataTableComponent({
  getdata,
  columns,
  height,
}: {
  getdata: any;
  columns: any;
  height: string;
}) {
  const [pagination, setPagination] = React.useState<PaginationState>({
    pageIndex: 0,
    pageSize: 10,
  });
  const [sorting, setSorting] = React.useState<SortingState>([]);

  //
  const { data, isLoading, refetch, isError } = useQuery(
    ["table", pagination],
    async () => await getdata(pagination)
    // { keepPreviousData: true }
  );

  const defaultData = React.useMemo(() => [], []);
  const table = useReactTable({
    data: data?.rows ?? defaultData,
    columns: columns as any,
    pageCount: data?.pageCount ?? 7,
    onSortingChange: setSorting,
    state: {
      sorting,
      pagination,
    },
    onPaginationChange: setPagination,
    getSortedRowModel: getSortedRowModel(),
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    manualPagination: true,
  });

  if (isLoading) {
    return (
      <div className="w-full h-[calc(100vh-70px)] flex flex-col items-center justify-center">
        <Loader2 className=" animate-spin text-primary" />
      </div>
    );
  }
  return (
    <div className="w-full ">
      <div className="flex flex-row items-center   h-[50px]   px-3 border-b">
        <div className="flex-1 text-sm text-neutral-500 flex flex-row items-center gap-2 ">
          <p> 총 {data?.pageCount}개의 데이터가 있습니다.</p>
        </div>
        <div className="flex flex-row items-center">
          {/* <Label>테이블 ROW</Label> */}
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
        {data?.pageCount &&
        data?.pageCount > table.getState().pagination.pageSize ? (
          <div className="space-x-2 flex flex-row items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
            >
              <ChevronLeft />
              {/* <MoveLeft /> */}
            </Button>

            <p className="border px-6 py-2 rounded-md text-sm text-neutral-500">
              {pagination.pageIndex + 1} /
              {Math.ceil(
                data?.pageCount! / table.getState().pagination.pageSize
              )}
            </p>

            <Button
              variant="outline"
              size="sm"
              onClick={() => table.nextPage()}
              disabled={
                // !table.getCanNextPage()
                Math.ceil(
                  data?.pageCount! / table.getState().pagination.pageSize
                ) <=
                pagination.pageIndex + 1
              }
            >
              <ChevronRight />
            </Button>
          </div>
        ) : null}
      </div>

      <ScrollArea className={`bg-neutral-100  w-full ${height} `}>
        <Table>
          <TableHeader className="bg-white">
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
          <TableBody className="bg-white">
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
      </ScrollArea>
    </div>
  );
}
