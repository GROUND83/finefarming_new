"use server";
import db from "@/lib/db";
import moment from "moment";
import { type } from "node:os";

export default async function searchDatabase(newString: string) {
  let newData = JSON.parse(newString);
  //
  console.log(newData);
  if (newData?.username !== "") {
    let searchData = await db.review.findMany({
      where: {
        user: {
          username: {
            contains: newData.username,
          },
        },
        point: {
          gte: Number(newData.minPoint),
          lte: Number(newData.maxPoint),
        },
        created_at: {
          gte: moment(newData.minDate).toISOString(),
          lte: moment(newData.maxDate).toISOString(),
        },
      },
      include: {
        user: true,
      },
    });
    console.log("searchData", searchData);
    return searchData;
  } else {
    //
    let searchData = await db.review.findMany({
      where: {
        point: {
          gte: Number(newData.minPoint),
          lte: Number(newData.maxPoint),
        },
        created_at: {
          gte: moment(newData.minDate).toISOString(),
          lte: moment(newData.maxDate).toISOString(),
        },
      },
      include: {
        user: true,
      },
    });
    console.log("searchData", searchData);
    return searchData;
  }
}
