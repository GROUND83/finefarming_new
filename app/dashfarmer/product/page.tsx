"use client";

import { DataTableComponent } from "@/components/table/tableComponent";
import { getMoreData } from "./_components/table/actions";
import { columns } from "./_components/table/colums";
import { getFarmer, getProduct } from "./_components/_actions";
import React from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { empty_avatar_url } from "@/lib/constants";
import { MoveRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import dayjs from "dayjs";

export default function FarmerList() {
  return (
    <div className="w-full h-full  p-3">
      <DataTableComponent
        getdata={getMoreData}
        columns={columns}
        height="h-[calc(100vh-120px)]"
      />
    </div>
  );
}
