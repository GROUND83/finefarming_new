import { DataTable } from "./components/table";
import { Prisma } from "@prisma/client";
import Search from "./components/search/search";

import NewFarmer from "./components/new/newData";

export default async function FarmerList() {
  return (
    <div className="w-full ">
      {/* <div className="w-full flex flex-row items-center justify-between bg-white px-2 py-2 rounded-md border gap-3">
  
        <NewFarmer />
      </div> */}
      <div className="w-full">
        <DataTable />
      </div>
    </div>
  );
}
