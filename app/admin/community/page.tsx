"use client";
import { Button } from "@/components/ui/button";
import Search from "../farm/search/page";
import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/outline";
import React from "react";
import { getCommunity } from "./_component/actions";
import NewCommunityModal from "./_component/newModal";
import { DataTable } from "./_component/table/table";

export default function Page() {
  const [community, setCommunity] = React.useState<any[]>([]);
  const getBaseData = async () => {
    //
    let result = await getCommunity({ pageIndex: 0, pageSize: 7 });
    setCommunity(result.rows);
  };
  React.useEffect(() => {
    getBaseData();
  }, []);

  return (
    <div className="w-full p-2">
      {/* <div className="w-full flex flex-row items-center justify-between bg-white px-2 py-2 rounded-md border gap-3 ">
        <Search />

        <NewCommunityModal getBaseData={getBaseData} />
      </div> */}
      <div>
        <DataTable />
      </div>
    </div>
  );
}
