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
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
//

const deletFarm = async (farmId: number) => {
  console.log(farmId);
  await deletFarm(farmId);
};

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <div className="flex flex-col items-start justify-center text-left ">
          <Button
            variant="ghost"
            className="  p-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            타이틀
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
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
    accessorKey: "farm",
    header: ({ column }) => {
      return (
        <div className="flex flex-col items-start">
          <Button
            variant="ghost"
            className=" p-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            농장
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      let farm: any = row.getValue("farm");
      return (
        <div className=" flex flex-row items-center gap-2 justify-start">
          <div className="flex flex-col items-start gap-1">
            <p>{farm?.name}</p>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "product",
    header: ({ column }) => {
      return (
        <div className="flex flex-col items-start">
          <Button
            variant="ghost"
            className=" p-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            체험상품
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      let product: any = row.getValue("product");
      return (
        <div className=" flex flex-row items-center gap-2 justify-start">
          <div className="flex flex-col items-start gap-1">
            <p>{product?.title}</p>
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
      console.log(row);
      return (
        <div className=" text-right">
          <Link href={`/dashwriter/magazine/${row.original.id}`}>
            <Button variant="outline" size="icon">
              <MagnifyingGlassIcon className="size-4" />
            </Button>
          </Link>
        </div>
      );
    },
  },
];
