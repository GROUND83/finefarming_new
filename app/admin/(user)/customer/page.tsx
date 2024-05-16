import { DataTableComponent } from "@/components/table/tableComponent";

import { getMoreData } from "./actions";
import { columns } from "./components/colums";

export default async function FarmerList() {
  return (
    <div className="w-full p-3 ">
      <DataTableComponent getdata={getMoreData} columns={columns} />
    </div>
  );
}
