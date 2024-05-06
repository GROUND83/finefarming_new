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
import { Rating, ThinStar, RoundedStar } from "@smastrom/react-rating";
import { MagnifyingGlassIcon, StarIcon } from "@heroicons/react/24/outline";
import { StarIcon as FillStartIcon } from "@heroicons/react/24/solid";
import StartPoint from "@/components/StartPoint";
import { updateReviewVisible } from "./actions";
import { useRouter } from "next/navigation";

// const deletFarm = async (farmId: number) => {
//   console.log(farmId);
//   await deletFarm(farmId);
// };

const clickopen = async ({ id }: { id: number }) => {
  console.log("공개", id);
  await updateReviewVisible({ id, type: true });
  window.location.reload();
};
const clickClose = async ({ id }: { id: number }) => {
  console.log("공개", id);
  await updateReviewVisible({ id, type: false });
  window.location.reload();
};
export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <div className="w-[300px]">
          <p>리뷰</p>
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
    accessorKey: "point",
    header: ({ column }) => {
      return (
        <div className="w-[100px] ">
          <p>점수</p>
        </div>
      );
    },
    cell: ({ row }) => {
      let point = row.original.point;
      console.log("point", point);
      return (
        <div className="  flex flex-row items-center gap-2">
          <StartPoint point={point} />
        </div>
      );
    },
  },
  {
    accessorKey: "user",
    header: "작성자",
    cell: ({ row }) => {
      let user: any = row.getValue("user");
      return (
        <div className=" flex flex-row items-center gap-2 justify-start">
          <Avatar>
            <AvatarImage src={user?.avatar} alt="@shadcn" sizes="sm" />
          </Avatar>
          <div className="flex flex-col items-start gap-1">
            <p>{user?.username}</p>
            <p className="text-neutral-500 text-light">{user?.phone}</p>
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
          <Link href={`/admin/review/${row.original.id}`}>
            <Button variant="outline" size="icon">
              <MagnifyingGlassIcon className="size-4" />
            </Button>
          </Link>
        </div>
      );
    },
  },
];
