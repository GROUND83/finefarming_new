import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";

import moment from "moment";

import Link from "next/link";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import dayjs from "dayjs";
//

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "reservationNumber",
    header: ({ column }) => {
      return (
        <div className="flex flex-col items-start justify-center text-left ">
          <Button
            variant="ghost"
            className="  p-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            예약번호
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className=" text-left">
          <p>{row.getValue("reservationNumber")}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "product.title",
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
      // let title: any = row.getValue("product.title");
      // console.log("row", title, row);
      return (
        <div className=" flex flex-row items-center gap-2 justify-start">
          {/* <Avatar>
            <AvatarImage src={onwer?.avatar} alt="@shadcn" sizes="sm" />
          </Avatar> */}
          <div className="flex flex-col items-start gap-1">
            <p>{row.original.product?.title}</p>
            {/* <p className="text-neutral-500 text-light">{onwer?.phone}</p> */}
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "visitor",
    header: ({ column }) => {
      return (
        <div>
          <Button
            variant="ghost"
            className=" p-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            방문자
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className=" ">
        <p>{row.getValue("visitor")}</p>
        <p>{row.original.visitorPhone}</p>
      </div>
    ),
  },
  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <div>
          <Button
            variant="ghost"
            className=" p-0"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            예약상태
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className=" ">
        {row.getValue("status") === "waiting" && (
          <Badge variant={"waiting"} className="text-xs space-y-0">
            확정대기
          </Badge>
        )}
        {row.getValue("status") === "complete" && (
          <Badge variant={"complete"} className="text-xs space-y-0">
            예약확정
          </Badge>
        )}
        {row.getValue("status") === "done" && (
          <Badge variant={"done"} className="text-xs space-y-0">
            방문완료
          </Badge>
        )}
        {row.getValue("status") === "cancle" && (
          <Badge variant={"cancel"} className="text-xs space-y-0">
            취소
          </Badge>
        )}
        {row.getValue("status") === "managercancle" && (
          <Badge variant={"cancel"} className="text-xs space-y-0">
            매니저 취소
          </Badge>
        )}
        {row.getValue("status") === "noshow" && (
          <Badge variant={"noshow"} className="text-xs space-y-0">
            노쇼
          </Badge>
        )}
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
            className=" p-0"
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
        <div className="   text-center">
          <p>{dayjs(row.getValue("checkInDate")).format("YYYY/MM/DD")}</p>
          <p>{row.original.checkInTime}</p>
        </div>
      );
    },
  },
  // {
  //   accessorKey: "created_at",
  //   header: ({ column }) => {
  //     return (
  //       <div className="text-center">
  //         <Button
  //           variant="ghost"
  //           className=" p-0"
  //           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //         >
  //           예약일
  //           <ArrowUpDown className="ml-2 h-4 w-4" />
  //         </Button>
  //       </div>
  //     );
  //   },
  //   cell: ({ row }) => {
  //     return (
  //       <div className="   text-center">
  //         <p>{dayjs(row.getValue("created_at")).format("YYYY/MM/DD HH:mm")}</p>
  //         {/* <p>{row.original.checkInTime}</p> */}
  //       </div>
  //     );
  //   },
  // },
  {
    id: "actions",
    cell: ({ row }) => {
      return (
        <div className=" text-right">
          <Link href={`/dashfarmer/reservation/${row.original.id}`}>
            <Button variant="outline" size="icon">
              <MagnifyingGlassIcon className="size-4" />
            </Button>
          </Link>
        </div>
      );
    },
  },
];
