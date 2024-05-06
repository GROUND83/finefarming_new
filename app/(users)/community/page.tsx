"use client";

import { Button } from "@/components/ui/button";

import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/outline";
import { DataTable } from "./_component/table/table";
import React from "react";
import { getCommunity } from "./_component/table/actions";
import EmptyData from "@/components/emptyData";
import moment from "moment";
import { Badge } from "@/components/ui/badge";

export default function Page() {
  const [community, setCommunity] = React.useState<any[]>([]);
  // const journals = await getJournal();
  // console.log("journals", journals);
  const getData = async () => {
    let result = await getCommunity({ pageIndex: 0, pageSize: 7 });
    console.log(result);
    setCommunity(result.rows);
  };
  React.useEffect(() => {
    getData();
  }, []);
  return (
    <div className="w-full relative">
      <div className="w-full border-b px-6 py-3 flex flex-row items-center justify-between ">
        <div className="flex flex-row gap-2 items-center">
          <ChatBubbleLeftEllipsisIcon className="size-6" />
          <p className="text-lg font-semibold">커뮤니티</p>
        </div>
        <div>
          <Button>글쓰기</Button>
        </div>
      </div>
      <div>
        <div className="md:hidden w-full p-3 ">
          {community.length > 0 ? (
            <div className="flex flex-col items-start gap-2 w-full">
              {community.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="border p-3 rounded-md w-full flex flex-col  items-start gap-2"
                  >
                    {item.visible && <Badge>공지사항</Badge>}
                    <p>{item.title}</p>
                    <div className="flex flex-row items-center w-full justify-between text-sm text-neutral-500">
                      <p>{item.authorName}</p>
                      <p>
                        {moment(item.created_at).format("YYYY년 MM월 DD일")}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="w-full h-[300px]">
              <EmptyData title="커뮤니티 데이터가" />
            </div>
          )}
        </div>
        {/* <div className="hidden md:flex">
          <DataTable />
        </div> */}
      </div>
    </div>
  );
}
