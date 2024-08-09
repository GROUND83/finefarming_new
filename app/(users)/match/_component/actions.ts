"use server";
import db from "@/lib/db";
import getDateTime from "@/lib/getDateTime";
import { connect } from "http2";
import { redirect } from "next/navigation";

// export async function getCommunity(options: {
//   pageIndex: number;
//   pageSize: number;
// }) {
//   const response = await db.$transaction([
//     db.community.count(),
//     db.community.findMany({
//       skip: options.pageSize * options.pageIndex,
//       take: options.pageSize,
//       orderBy: {
//         created_at: "desc", // 내림차순 최신순
//       },
//     }),
//   ]);
//   console.log("response", response);
//   const pageCount = response[0];
//   const rows = response[1];
//   console.log({ pageCount, rows });
//   return { pageCount, rows };
// }

export async function createMatching(data: string) {
  console.log(data);
  let newdata = JSON.parse(data);
  console.log("newdata", newdata);
  let result = await db.matching.create({
    data: {
      ...newdata,
      user: {
        connect: {
          id: newdata.user.id,
        },
      },
      created_at: getDateTime(),
      updated_at: getDateTime(),
    },
  });
  return { data: result };
}
export async function getMatchDetail(matchId: string) {
  let result = await db.matching.findUnique({
    where: {
      id: Number(matchId),
    },
    include: { user: { select: { id: true, email: true, username: true } } },
  });
  return { data: result };
}
