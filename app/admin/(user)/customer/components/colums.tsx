"use client";
import {
  PaginationState,
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { empty_avatar_url } from "@/lib/constants";
import dayjs from "dayjs";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "username",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-xs"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          이름
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      let { avatar } = row.original;
      let avaterCheck = Boolean(avatar);
      return (
        <div className="text-xs flex flex-row items-center gap-3">
          {avaterCheck ? (
            <Avatar>
              <AvatarImage src={`${avatar}`} />
            </Avatar>
          ) : (
            <Avatar>
              <AvatarImage src={`${empty_avatar_url}`} />
            </Avatar>
          )}
          <p>{row.getValue("username")}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "phone",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-xs"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          전화번호
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return <div className="text-left text-xs">{row.getValue("phone")}</div>;
    },
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-xs"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          이메일
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="text-xs">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "approve",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-xs"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          승인
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="text-xs">
        {row.getValue("approve") ? (
          <Badge variant={"primary"} className="  text-xs font-light">
            승인
          </Badge>
        ) : (
          <Badge
            variant="outline"
            className="text-neutral-400  text-xs font-light"
          >
            미승인
          </Badge>
        )}
      </div>
    ),
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="text-xs"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          가입일
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="text-xs">
          {dayjs(row.getValue("created_at")).format("YYYY/MM/DD")}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const manger = row.original;
      return (
        <div className="text-xs text-right">
          <Link href={`/admin/customer/${manger.id}`}>
            <Button variant="outline" size="icon">
              <MagnifyingGlassIcon className="size-4" />
            </Button>
          </Link>
        </div>
      );
    },
  },
];
