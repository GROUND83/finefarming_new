"use client";
import { DataTableComponent } from "@/components/table/tableComponent";
import { getMonthlyData, getMoreData } from "./_commponent/table/actions";
import { columns } from "./_commponent/table/colums";
import React from "react";
import NewMonthlyModal from "./_commponent/new/newMonthlyModal";

export default function Page() {
  const [monthly, setMonthly] = React.useState<any>([]);
  const getData = async () => {
    let res = await getMonthlyData();
    console.log("res", res);
    setMonthly(res.data);
  };
  React.useEffect(() => {
    getData();
  }, []);
  return (
    <div className="w-full p-3">
      <div className="flex flex-col items-start gap-2 w-full">
        {monthly.map((month: any, monthIndex: any) => {
          return (
            <div key={monthIndex} className="border p-3 flex flex-col w-full">
              <p className=" font-bold">{month.month}</p>
              <NewMonthlyModal monthly={month} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
