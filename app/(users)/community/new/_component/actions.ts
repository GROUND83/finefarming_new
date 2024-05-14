"use server";
import db from "@/lib/db";
import getDateTime from "@/lib/getDateTime";
import { notFound, redirect } from "next/navigation";

export async function getCommunity(options: {
  pageIndex: number;
  pageSize: number;
}) {
  const response = await db.$transaction([
    db.community.count(),
    db.community.findMany({
      skip: options.pageSize * options.pageIndex,
      take: options.pageSize,
      orderBy: {
        created_at: "desc", // 내림차순 최신순
      },
    }),
  ]);
  console.log("response", response);
  const pageCount = response[0];
  const rows = response[1];
  console.log({ pageCount, rows });
  return { pageCount, rows };
}

export async function createCommunity(data: string) {
  console.log(data);

  let newdata = JSON.parse(data);

  let result = await db.community.create({
    data: {
      ...newdata,
      created_at: getDateTime(),
      updated_at: getDateTime(),
    },
  });
  console.log("result", result);
  if (result) {
    redirect("/community/result");
  } else {
    notFound();
  }
}
