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

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "username",
    header: ({ column }) => {
      return (
        <div className="flex flex-col items-start justify-center text-left ">
          <Button
            variant="ghost"
            className="  p-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            이름
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className=" text-left">
          <p>{row.getValue("username")}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <div className="flex flex-col items-start">
          <Button
            variant="ghost"
            className=" p-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            이메일
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      // let onwer: any = row.getValue("owner");
      return (
        <div className=" flex flex-row items-center gap-2 justify-start">
          {/* <Avatar>
            <AvatarImage
              src={row.getValue("avatar")}
              alt="@shadcn"
              sizes="sm"
            />
          </Avatar> */}
          <div className="flex flex-col items-start gap-1">
            <p>{row.getValue("email")}</p>
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: "phone",
    header: ({ column }) => {
      return (
        <div className="flex flex-col items-start">
          <Button
            variant="ghost"
            className=" p-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            전화번호
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      // let onwer: any = row.getValue("owner");
      return (
        <div className=" flex flex-row items-center gap-2 justify-start">
          {/* <Avatar>
            <AvatarImage
              src={row.getValue("avatar")}
              alt="@shadcn"
              sizes="sm"
            />
          </Avatar> */}
          <div className="flex flex-col items-start gap-1">
            <p>{row.getValue("phone")}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "approve",
    header: ({ column }) => {
      return (
        <div>
          <Button
            variant="ghost"
            className=" p-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            공개
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className=" ">
        {row.getValue("approve") ? (
          <Badge variant={"primary"} className="   font-light">
            공개
          </Badge>
        ) : (
          <Badge variant="outline" className="text-neutral-400   font-light">
            비공개
          </Badge>
        )}
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
            className=" p-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            생성일
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="   text-center">
          <p>{moment(row.getValue("created_at")).format("YYYY/MM/DD")}</p>
        </div>
      );
    },
  },
  // {
  //   id: "actions",
  //   cell: ({ row }) => {
  //     console.log(row);
  //     return (
  //       <div className=" text-right">
  //         <Link href={`/admin/farm/${row.original.id}/base`}>
  //           <Button variant="outline" size="icon">
  //             <MagnifyingGlassIcon className="size-4" />
  //           </Button>
  //         </Link>
  //       </div>
  //     );
  //   },
  // },
];

interface DataTableProps {
  tableData: TableDataType[];
  totalCount: number;
}
export function SearchTable(props: DataTableProps) {
  const [data, setData] = React.useState(props.tableData);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const table = useReactTable({
    data: props.tableData ? props.tableData : [],
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
