import { Button } from "@/components/ui/button";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";
import getWriter from "../actions";
import { DataTable } from "./_component/table/table";

export default function Page() {
  return (
    <div className="w-full">
      <DataTable />
    </div>
  );
}
