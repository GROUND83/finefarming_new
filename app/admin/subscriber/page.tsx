import Search from "./search/page";
import { DataTable } from "./_component/table/table";

export default async function Page() {
  return (
    <div className="w-full p-2">
      <div>
        <DataTable />
      </div>
    </div>
  );
}
