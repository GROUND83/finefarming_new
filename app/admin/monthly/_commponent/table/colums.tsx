import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import moment from "moment";
import Link from "next/link";
//
import { MagnifyingGlassIcon, StarIcon } from "@heroicons/react/24/outline";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <div className="w-[300px]">
          <p>타이틀</p>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className=" text-left">
          <p>{row.getValue("title")}</p>
        </div>
      );
    },
  },
  {
    id: "farm",
    header: "농장",
    cell: ({ row }) => {
      return (
        <div className="flex flex-col items-start">
          <p className=" font-semibold">{row.original.product?.title}</p>
          <div className=" flex flex-row items-center gap-2 justify-start">
            <div className="flex flex-col items-start gap-1 text-neutral-500">
              <p>{row.original.farm?.name}</p>
            </div>
          </div>
        </div>
      );
    },
  },

  {
    accessorKey: "author",
    header: "작성자",
    cell: ({ row }) => {
      let user: any = row.getValue("author");
      return (
        <div className=" flex flex-row items-center gap-2 justify-start">
          <Avatar>
            <AvatarImage src={user?.avatar} alt="@shadcn" sizes="sm" />
          </Avatar>
          <div className="flex flex-col items-start gap-1">
            <p>{user?.username}</p>
            <p className="text-neutral-500 text-light">{user?.email}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "visible",
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
        {row.getValue("visible") ? (
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
  {
    id: "actions",
    cell: ({ row }) => {
      // console.log(row);
      let visible = row.original.visible;
      // console.log("visible", visible);
      return (
        <div className=" text-right">
          <Link href={`/admin/magazine/${row.original.id}`}>
            <Button variant="outline" size="icon">
              <MagnifyingGlassIcon className="size-4" />
            </Button>
          </Link>
        </div>
      );
    },
  },
];
