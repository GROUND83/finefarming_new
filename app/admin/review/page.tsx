import Search from "./search/page";
import { DataTable } from "./_component/table/table";
import { DataTableComponent } from "@/components/table/tableComponent";
import { getMoreData } from "./_component/table/actions";
import { columns } from "./_component/table/colums";

export default async function Page() {
  return (
    <div className="w-full p-3">
      <div>
        <DataTableComponent
          getdata={getMoreData}
          columns={columns}
          height="h-[calc(100vh-120px)]"
        />
      </div>
    </div>
  );
}
