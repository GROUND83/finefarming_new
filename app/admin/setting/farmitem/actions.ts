"use server";

import db from "@/lib/db";

export async function getFarmItems() {
  //

  let farmItems = await db.farmItem.findMany({
    select: {
      title: true,
    },
  });
  let facility = await db.facility.findMany({
    select: {
      title: true,
    },
  });
  let tools = await db.tool.findMany({
    select: {
      title: true,
    },
  });
  // console.log(data);
  return { farmItems, facility, tools };
}

export async function editFarmItems(data: string) {
  //
  let parser = JSON.parse(data);
  console.log("parser", parser);
  // farmItems
  let deleteFarmItems = await db.farmItem.deleteMany();
  let createFarmItems = await db.farmItem.createMany({
    data: parser.farmItems,
  });
  let deleteFacility = await db.facility.deleteMany();
  let createFacility = await db.facility.createMany({
    data: parser.facility,
  });
  let deletetool = await db.tool.deleteMany();
  let createtool = await db.tool.createMany({
    data: parser.tools,
  });
  return;
}
