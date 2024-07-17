"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

export async function logOut() {
  const session = await getSession();
  session.destroy();
  return redirect("/");
}
export default async function getWriter() {
  const session = await getSession();
  console.log("sessiont", session);
  if (session.id && session.role) {
    const user = await db.writer.findUnique({
      where: {
        id: session.id,
      },
      select: {
        id: true,
        email: true,
        avatar: true,
        username: true,
        created_at: true,
      },
    });
    if (user) {
      return user;
    }
    return redirect("/writerAuth");
  } else {
    return redirect("/writerAuth");
  }
}
