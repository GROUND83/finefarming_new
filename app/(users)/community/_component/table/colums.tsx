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
import {
  MagnifyingGlassCircleIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import ActionCommunityModal from "./actionModal";
import { tree } from "next/dist/build/templates/app-page";
//

const deletFarm = async (farmId: number) => {
  console.log(farmId);
  await deletFarm(farmId);
};

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "id",
    header: "순번",
    enableResizing: true, //disable resizing for just this column
    size: 20, //starting column size
    cell: ({ row }) => {
      return (
        <div className=" text-left lg:text-sm text-xs ">
          <p>{row.getValue("id")}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <div className="flex flex-col items-start ">
          <Button variant="ghost" className=" p-0">
            제목
          </Button>
        </div>
      );
    },
    enableResizing: true, //disable resizing for just this column
    size: 400, //starting column size
    cell: ({ row }) => {
      console.log("row", row.original.isNotice);
      let isNotice = row.original.isNotice;
      return (
        <div className=" flex flex-row items-center gap-2 justify-start lg:text-sm text-xs">
          {isNotice && <Badge variant={"complete"}>공지</Badge>}
          <p>{row.getValue("title")}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "authorName",
    header: ({ column }) => {
      return (
        <div>
          <Button variant="ghost" className=" p-0">
            작성자
          </Button>
        </div>
      );
    },
    enableResizing: true, //disable resizing for just this column
    size: 50, //starting column size
    cell: ({ row }) => {
      return (
        <div className="flex flex-col items-start gap-1  lg:text-sm text-xs">
          <p>{row.getValue("authorName")}</p>
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
    enableResizing: true, //disable resizing for just this column
    size: 50, //starting column size
    cell: ({ row }) => {
      return (
        <div className="   text-center lg:text-sm text-xs">
          <p>{moment(row.getValue("created_at")).format("YYYY/MM/DD")}</p>
        </div>
      );
    },
  },
  {
    id: "actions",
    enableResizing: true, //disable resizing for just this column
    size: 50, //starting column size
    cell: ({ row }) => {
      console.log(row);
      return (
        <div className=" text-right">
          <Link href={`/community/${row.original.id}`}>
            <Button variant="outline" size="icon">
              <MagnifyingGlassIcon className="size-4" />
            </Button>
          </Link>
        </div>
      );
    },
  },
];
