"use server";

import db from "@/lib/db";
import getDateTime from "@/lib/getDateTime";
import getSession from "@/lib/session";
import { notFound } from "next/navigation";

export async function getUserData() {
  let session = await getSession();
  console.log(session);
  if (session) {
    let result = await db.writer.findUnique({
      where: {
        id: Number(session.id),
      },
      select: {
        id: true,
        username: true,
        email: true,
        avatar: true,
        intruduce: true,
        intruduceTitle: true,
        link: true,
      },
    });
    return result;
  } else {
    return notFound();
  }
}

export async function updateUser(formdata: FormData) {
  //
  let userId = Number(formdata.get("userId")) as number;
  let avatar = formdata.get("avatar") as string;
  let username = formdata.get("username") as string;
  let link = formdata.get("link") as string;
  let intruduceTitle = formdata.get("intruduceTitle") as string;
  let intruduce = formdata.get("intruduce") as string;
  console.log(userId, avatar, username, link, intruduceTitle, intruduce);
  if (userId) {
    let user = await db.writer.update({
      where: {
        id: userId,
      },
      data: {
        avatar: avatar,
        username: username,
        link: link,
        intruduceTitle: intruduceTitle,
        intruduce: intruduce,
        updated_at: getDateTime(),
      },
    });
    return user;
  }
}
