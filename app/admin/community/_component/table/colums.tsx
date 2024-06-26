import { ColumnDef } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";

import { Badge } from "@/components/ui/badge";

import moment from "moment";
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
    accessorKey: "visible",
    header: "공개여부",
    cell: ({ row }) => (
      <div className=" ">
        {row.getValue("visible") ? (
          <Badge>공개</Badge>
        ) : (
          <Badge variant={"outline"}>비공개</Badge>
        )}
      </div>
    ),
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
      // console.log(row);
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
