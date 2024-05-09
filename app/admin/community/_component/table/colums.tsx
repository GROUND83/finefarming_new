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
    accessorKey: "id",
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
          <p>{row.getValue("id")}</p>
        </div>
      );
    },
  },

  {
    accessorKey: "title",
    header: "제목",
    cell: ({ row }) => {
      let isNotice = row.original.isNotice;
      return (
        <div className=" flex flex-row items-center gap-2 justify-start flex-1 ">
          {isNotice && <Badge variant={"complete"}>공지</Badge>}
          <p>{row.getValue("title")}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "authorName",
    header: "작성자",
    cell: ({ row }) => (
      <div className=" ">
        <p>{row.getValue("authorName")}</p>
      </div>
    ),
  },
  {
    accessorKey: "created_at",
    header: "생성일",
    cell: ({ row }) => {
      return (
        <div className="   text-left">
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
          <Link href={`/admin/community/${row.original.id}`}>
            <Button variant="outline" size="icon">
              <MagnifyingGlassIcon className="size-4" />
            </Button>
          </Link>
        </div>
      );
    },
  },
];
