"use server";

import db from "@/lib/db";
import getDateTime from "@/lib/getDateTime";
export async function getMoreData(options: {
  pageIndex: number;
  pageSize: number;
}) {
  const response = await db.$transaction([
    db.banner.count(),
    db.banner.findMany({
      skip: options.pageSize * options.pageIndex,
      take: options.pageSize,
      orderBy: {
        created_at: "desc", // 내림차순 최신순
      },
    }),
  ]);
  const pageCount = response[0];
  const rows = response[1];
  console.log({ pageCount, rows });
  return { pageCount, rows };
}

export async function getBanner(bannerId: number) {
  //

  let banners = await db.banner.findUnique({
    where: {
      id: bannerId,
    },
  });

  // console.log(data);
  return banners;
}

export async function editFarmItems(data: string) {
  //
  let parser = JSON.parse(data);
  console.log("parser", parser);
  let restul = await db.banner.update({
    where: {
      id: parser.id,
    },
    data: {
      ...parser,
      updated_at: getDateTime(),
    },
  });

  return { message: "ok" };
}
export async function newBanner(data: string) {
  //
  let parser = JSON.parse(data);
  console.log("parser", parser);
  let restul = await db.banner.create({
    data: {
      ...parser,
      created_at: getDateTime(),
      updated_at: getDateTime(),
    },
  });

  return { message: "ok" };
}
export async function deleteBanner(bannerId: number) {
  //

  let banners = await db.banner.delete({
    where: {
      id: bannerId,
    },
  });

  // console.log(data);
  return banners;
}
