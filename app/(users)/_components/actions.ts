"use server";
import db from "@/lib/db";

import { notFound, permanentRedirect, redirect } from "next/navigation";

export async function getUser({
  userId,
  role,
}: {
  userId: number;
  role: string;
}) {
  if (!userId) {
    return;
  }
  if (!role) {
    return;
  }
  if (userId && role === "user") {
    const user = await db.user.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        email: true,
        avatar: true,
        username: true,
        created_at: true,
        role: true,
      },
    });
    console.log("user", user);
    if (user) {
      return JSON.stringify(user);
    }
  } else if (userId && role === "superAdmin") {
    const user = await db.superManager.findUnique({
      where: {
        id: userId,
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
      return JSON.stringify(user);
    }
  } else if (userId && role === "manager") {
    const user = await db.manager.findUnique({
      where: {
        id: userId,
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
      return JSON.stringify(user);
    }
  } else {
    return;
  }
}

export async function updateSubscriper(data: string) {
  if (data) {
    let parser = JSON.parse(data);
    let result = await db.subscriber.create({
      data: {
        email: parser.email,
      },
    });
    return result;
  }
}
