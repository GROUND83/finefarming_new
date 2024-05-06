import { DataTable } from "./_components/table/table";
import { Prisma } from "@prisma/client";
import Search from "./search/page";

import Link from "next/link";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";

export default async function FarmerList() {
  return (
    <div className="w-full h-full">
      <DataTable />
    </div>
  );
}
