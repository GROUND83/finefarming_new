import {
  PaginationState,
  ColumnDef,
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  createColumnHelper,
} from "@tanstack/react-table";
import { TableDataType } from "./table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import moment from "moment";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
//

const deletFarm = async (farmId: number) => {
  console.log(farmId);
  await deletFarm(farmId);
};

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <div className="flex flex-col items-start justify-center text-left ">
          <Button variant="ghost" className="  p-0">
            순번
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className=" text-left">
          <p>{row.getValue("name")}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "owner",
    header: ({ column }) => {
      return (
        <div className="flex flex-col items-start">
          <Button variant="ghost" className=" p-0">
            제목
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      let onwer: any = row.getValue("owner");
      return (
        <div className=" flex flex-row items-center gap-2 justify-start">
          <Avatar>
            <AvatarImage src={onwer?.avatar} alt="@shadcn" sizes="sm" />
          </Avatar>
          <div className="flex flex-col items-start gap-1">
            <p>{onwer?.username}</p>
            <p className="text-neutral-500 text-light">{onwer?.phone}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "owner",
    header: ({ column }) => {
      return (
        <div>
          <Button variant="ghost" className=" p-0">
            작성자
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      let onwer: any = row.getValue("owner");
      return (
        <div className="flex flex-col items-start gap-1">
          <p>{onwer?.username}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button variant="ghost" className=" p-0">
            생성일
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
];
