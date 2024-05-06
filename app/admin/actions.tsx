"use server";

import db from "@/lib/db";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

export async function logOut() {
  const session = await getSession();
  session.destroy();
  return redirect("/");
}
export default async function getManager() {
  const session = await getSession();
  console.log("sessiont", session);
  if (session.role === "manager") {
    if (session.id) {
      const user = await db.manager.findUnique({
        where: {
          id: session.id,
        },
        select: {
          id: true,
          email: true,
          avatar: true,
          username: true,
          role: true,
          created_at: true,
        },
      });
      if (user) {
        return user;
      }
      return redirect("/managerAuth");
    } else {
      return redirect("/managerAuth");
    }
  } else if (session.role === "superAdmin") {
    if (session.id) {
      const user = await db.superManager.findUnique({
        where: {
          id: session.id,
        },
        select: {
          id: true,
          email: true,
          avatar: true,
          username: true,
          role: true,
          created_at: true,
        },
      });
      if (user) {
        return user;
      }
      return redirect("/managerAuth");
    } else {
      return redirect("/managerAuth");
    }
  }
}
