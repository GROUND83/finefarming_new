import Link from "next/link";
import { DataTable } from "./_components/table/DataTable";

export default async function Page() {
  return (
    <div className="w-full p-3">
      <DataTable />
    </div>
  );
}
