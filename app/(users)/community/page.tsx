"use client";

import { Button } from "@/components/ui/button";

import {
  ChatBubbleLeftEllipsisIcon,
  PlusIcon,
} from "@heroicons/react/24/outline";
import { DataTable } from "./_component/table/table";
import React from "react";
import { getCommunity } from "./_component/table/actions";
import EmptyData from "@/components/emptyData";
import moment from "moment";
import { Badge } from "@/components/ui/badge";

import { useSession } from "next-auth/react";
import { MobileTable } from "./_component/table/mobileTable";
import NewCommunity from "./_component/newModal";
import Footer from "@/components/footerWrap";
import Link from "next/link";

export default function Page() {
  const [community, setCommunity] = React.useState<any[]>([]);
  const { data: session } = useSession();
  // const journals = await getJournal();
  // console.log("journals", journals);
  const getData = async () => {
    let result = await getCommunity({ pageIndex: 0, pageSize: 7 });
    console.log(result);
    setCommunity(result.rows);
  };
  const getUser = async () => {};
  React.useEffect(() => {
    // getUser()
    getData();
    console.log("session", session);
  }, [session]);
  return (
    <div className="w-full bg-white">
      <div className="w-full relative lg:container lg:mx-auto mt-3 px-3 lg:px-0 min-h-screen">
        <div className="w-full border-b lg:border-none px-6 py-3 flex flex-row items-center justify-between ">
          <div className="flex flex-row gap-2 items-center">
            <ChatBubbleLeftEllipsisIcon className="size-6" />
            <p className="text-lg lg:text-xl font-semibold">커뮤니티</p>
          </div>
          {session && (
            <div>
              <Button asChild>
                <Link
                  href="/community/new"
                  className="flex flex-row items-center gap-2"
                >
                  <PlusIcon className="size-4" />
                  커뮤니터
                </Link>
              </Button>
            </div>
          )}
        </div>

        <div className="mt-3 xs:hidden sm:hidden md:hidden">
          <DataTable />
        </div>
        <div className="mt-3 lg:hidden">
          <MobileTable />
        </div>
      </div>
      <Footer />
    </div>
  );
}
