"use client";

import * as React from "react";
import moment from "moment";
import {
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { empty_avatar_url } from "@/lib/constants";

export interface TableDataType {
  id: number;
  username: string;
  email: string | null;
  phone: string | null;
  avatar: string | null;
  created_at: Date;
  approve: boolean;
}
export interface TableDataTypeProps {
  tableData: TableDataType[];
}

export const columns: ColumnDef<TableDataType>[] = [
  {
    accessorKey: "reservationNumber",
    header: ({ column }) => {
      return (
        <div className=" text-left flex flex-row items-center justify-start">
          <Button
            variant="ghost"
            className=" text-left flex flex-row items-center justify-start"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <p className="text-left">예약번호</p>
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className=" text-left">
          <p className="text-left">{row.getValue("reservationNumber")}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "farm",
    header: ({ column }) => {
      return (
        <div className="text-left">
          <Button
            variant="ghost"
            className=""
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            농장
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="text-left ">
          <p>{row.getValue("farm")?.name}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "user",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            className=""
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            예약자
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className=" text-center">
        <p>{row.getValue("user")?.username}</p>
      </div>
    ),
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            className=""
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            예약일
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className=" text-center">
        <p>{moment(row.getValue("created_at")).format("YYYY/MM/DD")}</p>
      </div>
    ),
  },
  {
    accessorKey: "checkInDate",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            className=""
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            방문일시
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className=" text-center">
          <p>{moment(row.getValue("checkInDate")).format("YYYY/MM/DD")}</p>
        </div>
      );
    },
  },

  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            className=" text-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            상태
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className=" text-center">
          {row.getValue("status") === "waiting" && (
            <Badge variant={"waiting"} className="">
              확정대기
            </Badge>
          )}
          {row.getValue("status") === "complete" && (
            <Badge variant={"complete"} className="">
              예약확정
            </Badge>
          )}
          {row.getValue("status") === "done" && (
            <Badge variant={"done"} className="">
              방문완료
            </Badge>
          )}
          {row.getValue("status") === "cancel" && (
            <Badge variant={"cancel"} className="">
              취소
            </Badge>
          )}
          {row.getValue("status") === "noshow" && (
            <Badge variant={"noshow"} className="">
              노쇼
            </Badge>
          )}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const reservation = row.original;
      // console.log("reservation", reservation);
      return (
        <div className=" text-right">
          <Link href={`/admin/reservation/${reservation.id}`}>
            <Button variant="outline" size="icon">
              <MagnifyingGlassIcon className="size-4" />
            </Button>
          </Link>
        </div>
      );
    },
  },
];

interface DataTableProps {
  tableData: TableDataType[];
  totalCount: number;
}
export function SearchTable(props: DataTableProps) {
  const [data, setData] = React.useState(props.tableData);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const table = useReactTable({
    data: data,
    columns,
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualPagination: true,
    autoResetPageIndex: false,
    state: {
      sorting,
    },
  });

  //
  return (
    <div className="w-full">
      <div className="rounded-md border w-full">
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
          총 {props.totalCount}개의 데이터가 있습니다.
        </div>
      </div>
    </div>
  );
}
