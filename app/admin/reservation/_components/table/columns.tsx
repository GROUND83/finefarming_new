import { ColumnDef } from "@tanstack/react-table";
import { TableDataType } from "./DataTable";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";
import moment from "moment";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

export const columns: ColumnDef<TableDataType>[] = [
  {
    accessorKey: "reservationNumber",
    header: ({ column }) => {
      return (
        <div className=" text-left flex flex-row items-center justify-start">
          <Button
            variant="ghost"
            className=" text-left flex flex-row items-center justify-start"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            <p className="text-left">예약번호</p>
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className=" text-left">
          <p className="text-left">{row.getValue("reservationNumber")}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "farm",
    header: ({ column }) => {
      return (
        <div className="text-left">
          <Button
            variant="ghost"
            className=""
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            농장
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className="text-left ">
          <p>{row.getValue("farm")?.name}</p>
        </div>
      );
    },
  },
  {
    accessorKey: "user",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            className=""
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            예약자
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className=" text-center">
        <p>{row.getValue("user")?.username}</p>
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
            className=""
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            예약일
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => (
      <div className=" text-center">
        <p>{moment(row.getValue("created_at")).format("YYYY/MM/DD")}</p>
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
            className=""
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
        <div className=" text-center">
          <p>{moment(row.getValue("checkInDate")).format("YYYY/MM/DD")}</p>
        </div>
      );
    },
  },

  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
        <div className="text-center">
          <Button
            variant="ghost"
            className=" text-center"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            상태
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      return (
        <div className=" text-center">
          {row.getValue("status") === "waiting" && (
            <Badge variant={"waiting"} className="">
              확정대기
            </Badge>
          )}
          {row.getValue("status") === "complete" && (
            <Badge variant={"complete"} className="">
              예약확정
            </Badge>
          )}
          {row.getValue("status") === "done" && (
            <Badge variant={"done"} className="">
              방문완료
            </Badge>
          )}
          {row.getValue("status") === "cancel" && (
            <Badge variant={"cancel"} className="">
              취소
            </Badge>
          )}
          {row.getValue("status") === "noshow" && (
            <Badge variant={"noshow"} className="">
              노쇼
            </Badge>
          )}
        </div>
      );
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const reservation = row.original;
      // console.log("reservation", reservation);
      return (
        <div className=" text-right">
          <Link href={`/admin/reservation/${reservation.id}`}>
            <Button variant="outline" size="icon">
              <MagnifyingGlassIcon className="size-4" />
            </Button>
          </Link>
        </div>
      );
    },
  },
];
