"use server";
import db from "@/lib/db";

export default async function searchDatabase({ type, search }: any) {
  if (type === "farmName") {
    let searchData = await db.farm.findMany({
      where: {
        name: {
          contains: search,
        },
      },
      select: {
        id: true,
        initail: true,
        name: true,
        visible: true,
        address: true,
        created_at: true,
        owner: {
          select: {
            id: true,
            username: true,
            phone: true,
            avatar: true,
          },
        },
      },
    });
    console.log("searchData", searchData);
    return JSON.stringify(searchData);
  } else if (type === "farmer") {
    let searchData = await db.farm.findMany({
      select: {
        id: true,
        initail: true,
        name: true,
        visible: true,
        address: true,
        created_at: true,
        owner: {
          select: {
            id: true,
            username: true,
            phone: true,
            avatar: true,
          },
        },
      },
      where: {
        owner: {
          username: {
            contains: search,
          },
        },
      },
    });
    console.log("searchData", searchData);
    return JSON.stringify(searchData);
  }
}
