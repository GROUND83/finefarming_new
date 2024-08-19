import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "baseProduct",
    header: ({ column }) => {
      return (
        <div className=" ">
          <Button
            variant="ghost"
            className="text-sm"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            제목
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      console.log("roq", row);
      return (
        <div className="text-sm">
          <p>{row.original.title}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "user",
    header: ({ column }) => {
      return (
        <div className=" ">
          <Button
            variant="ghost"
            className="text-sm"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            작성자
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      console.log("roq", row);
      return (
        <div className="text-sm">
          <p>{row.original.user?.username}</p>
          <p>{row.original.user?.email}</p>
        </div>
      );
    },
  },

  // {
  //   accessorKey: "visible",
  //   header: ({ column }) => {
  //     return (
  //       <div>
  //         <Button
  //           variant="ghost"
  //           className="text-sm "
  //           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //         >
  //           공개
  //           <ArrowUpDown className="ml-2 h-4 w-4" />
  //         </Button>
  //       </div>
  //     );
  //   },
  //   cell: ({ row }) => (
  //     <div className="text-sm ">
  //       {row.getValue("visible") ? (
  //         <Badge variant={"primary"} className="  text-sm font-light">
  //           공개
  //         </Badge>
  //       ) : (
  //         <Badge
  //           variant="outline"
  //           className="text-neutral-400  text-sm font-light"
  //         >
  //           비공개
  //         </Badge>
  //       )}
  //     </div>
  //   ),
  // },
  {
    accessorKey: "created_at",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            className="text-sm "
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
        <div className="text-sm   text-center">
          <p>{dayjs(row.getValue("created_at")).format("YYYY/MM/DD")}</p>
        </div>
      );
    },
  },

  {
    id: "actions",
    cell: ({ row }) => {
      const product = row.original;
      console.log("product", product);
      return (
        <div className=" text-right">
          <Link href={`/admin/matching/${product.id}`}>
            <Button variant="outline" size="icon">
              <MagnifyingGlassIcon className="size-4" />
            </Button>
          </Link>
        </div>
      );
    },
  },
];
