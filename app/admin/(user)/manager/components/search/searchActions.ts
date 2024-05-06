"use server";
import db from "@/lib/db";

export default async function searchDatabase({ type, search }: any) {
  if (type === "username") {
    let searchData = await db.manager.findMany({
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
        approve: true,
        avatar: true,
        created_at: true,
      },
    });
    console.log("searchData", searchData);
    return searchData;
  } else if (type === "email") {
    //
    let searchData = await db.manager.findMany({
      where: {
        email: {
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
    return searchData;
  } else if (type === "phone") {
    let searchData = await db.manager.findMany({
      where: {
        phone: {
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
    return searchData;
  }
}
