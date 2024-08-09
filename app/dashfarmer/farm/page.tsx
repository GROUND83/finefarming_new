"use client";

import { DataTableComponent } from "@/components/table/tableComponent";
import { getMoreData } from "./_components/table/actions";
import { columns } from "./_components/table/colums";
import { getFarmer } from "./_components/_actions";
import React from "react";
import { useSession } from "next-auth/react";

export default function FarmerList() {
  const [farmer, setFamer] = React.useState<any>();
  const [farm, setFarm] = React.useState<any>([]);
  const { data: session } = useSession();
  //
  const getFarmData = async () => {
    let userId = session?.user.id;
    if (userId) {
      let farmerRes = await getFarmer({ ownerId: Number(userId) });
      console.log("farm", farmerRes);
      setFamer(farmerRes);
      setFarm(farmerRes?.farm);
    }
  };
  React.useEffect(() => {
    getFarmData();
  }, [session?.user.id]);
  return (
    <div className="w-full h-full  ">
      <DataTableComponent
        getdata={getMoreData}
        columns={columns}
        height="h-[calc(100vh-120px)]"
      />
    </div>
  );
}
