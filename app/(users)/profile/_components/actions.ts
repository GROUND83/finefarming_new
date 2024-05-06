"use server";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";

export async function logOut() {
  const session = await getSession();
  session.destroy();
  return redirect("/");
}

export async function getUser() {
  const session = await getSession();
  console.log(session);
  if (session.id && session.role === "user") {
    const user = await db.user.findUnique({
      where: {
        id: session.id,
      },
      select: {
        id: true,
        email: true,
        avatar: true,
        username: true,
        created_at: true,
        role: true,
        approve: true,
        reservation: {
          include: {
            farm: true,
          },
        },

        reviews: {
          include: {
            product: true,
          },
        },
      },
    });
    if (user) {
      return user;
    }
  } else if (session.id && session.role === "superAdmin") {
    const user = await db.superManager.findUnique({
      where: {
        id: session.id,
      },
      select: {
        id: true,
        email: true,
        avatar: true,
        username: true,
        created_at: true,
        role: true,
        approve: true,
      },
    });
    if (user) {
      return user;
    }
  } else if (session.id && session.role === "manager") {
    const user = await db.manager.findUnique({
      where: {
        id: session.id,
      },
      select: {
        id: true,
        email: true,
        avatar: true,
        username: true,
        created_at: true,
        role: true,
        approve: true,
      },
    });
    if (user) {
      return user;
    }
  } else {
    return;
  }
  //   notFound();
}
