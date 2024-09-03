"use server";
import db from "@/lib/db";

export default async function searchDatabase({ type, search }: any) {
  if (type === "username") {
    let searchData = await db.writer.findMany({
      where: {
        username: {
          contains: search,
        },
      },
      select: {
        id: true,
        username: true,
        phone: true,
        email: true,
        avatar: true,
        approve: true,
        created_at: true,
      },
    });
    console.log("searchData", searchData);
    return JSON.stringify(searchData);
  } else if (type === "email") {
    let searchData = await db.writer.findMany({
      select: {
        id: true,
        username: true,
        phone: true,
        email: true,
        avatar: true,
        approve: true,
        created_at: true,
      },
      where: {
        email: {
          contains: search,
        },
      },
    });
    console.log("searchData", searchData);
    return JSON.stringify(searchData);
  } else if (type === "phone") {
    let searchData = await db.writer.findMany({
      select: {
        id: true,
        username: true,
        phone: true,
        email: true,
        avatar: true,
        approve: true,
        created_at: true,
      },
      where: {
        phone: {
          contains: search,
        },
      },
    });
    console.log("searchData", searchData);
    return JSON.stringify(searchData);
  }
}
