"use server";
import { authOptions } from "@/lib/auth";
import db from "@/lib/db";
import getDateTime from "@/lib/getDateTime";
import dayjs from "dayjs";
import { connect } from "http2";
import { getServerSession } from "next-auth";
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
      title: newdata.title || "",
      description: newdata.description || "",
      region: newdata.region || "",
      number: Number(newdata.number) || 0,
      preference: newdata.preference || "",
      spent: newdata.spent || "",
      startDate: dayjs(newdata.dob.from).format("YYYY-MM-DD"),
      endDate: dayjs(newdata.dob.to).format("YYYY-MM-DD"),
      lastDate: dayjs(newdata.lastDate).format("YYYY-MM-DD"),
      authorName: newdata.user.username,
      authorPhone: newdata.user.phone,
      authorEmail: newdata.user.email,
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
  let session = await getServerSession(authOptions);
  console.log("session", session);
  let result = await db.matching.findUnique({
    where: {
      id: Number(matchId),
    },
    include: { user: { select: { id: true, email: true, username: true } } },
  });
  if (session?.user.role === "user") {
    if (session?.user.id === result?.user.id) {
      //
      return { data: result };
    } else {
      //
      let newResult = {
        ...result,
        user: { username: "******", email: "******", userphone: "******" },
        authorName: "******",
        authorPhone: "******",
        authorEmail: "******",
      };
      return { data: newResult };
      // newResult?.user.username = "******"
    }
  }
  if (session?.user.role === "farmer") {
    //
    return { data: result };
  }
  if (session?.user.role === "manager" || session?.user.role === "superAdmin") {
    //
    return { data: result };
  }
}
