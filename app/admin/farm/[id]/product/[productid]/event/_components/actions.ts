"use server";
import bcrypt from "bcrypt";
import db from "@/lib/db";
import { redirect } from "next/navigation";

import { uploadSchema } from "./newFarmImageSchema";
import getDateTime from "@/lib/getDateTime";
import { connect } from "http2";

export async function newEvent(jsonData: string) {
  // let images: any = formData.get("images");
  let jsonParser = JSON.parse(jsonData);
  console.log("jsonParser", jsonParser);

  let result = await db.event.create({
    data: {
      title: jsonParser.title,
      description: jsonParser.description,
      image: jsonParser.image ?? "",
      productId: jsonParser.productId,
      created_at: getDateTime(),
      updated_at: getDateTime(),
    },
  });
  return result;
}
export async function updateEvent(jsonData: string) {
  // let images: any = formData.get("images");
  let jsonParser = JSON.parse(jsonData);
  console.log("jsonParser", jsonParser);

  let result = await db.event.update({
    where: {
      id: jsonParser.id,
    },
    data: {
      title: jsonParser.title,
      description: jsonParser.description,
      image: jsonParser.image ?? "",
      visible: jsonParser.visible,
      updated_at: getDateTime(),
    },
  });
  return result;
}
export async function deleteEvent(eventId: number) {
  // let images: any = formData.get("images");

  let result = await db.event.delete({
    where: {
      id: eventId,
    },
  });
  return result;
}
export async function getEvent(id: number) {
  console.log("id", id);
  let event = await db.event.findUnique({
    where: {
      id: id,
    },
  });
  console.log("event", event);
  return event;
}
