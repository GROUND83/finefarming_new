"use server";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { getServerSession } from "next-auth";
import { revalidatePath } from "next/cache";
import { notFound, permanentRedirect, redirect } from "next/navigation";

// export async function logOut() {
//   const session = await getServerSession();
//   session.destroy();
//   // revalidatePath("/");
//   return permanentRedirect("/");
// }

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
        approve: true,
        provider: true,
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
        provider: true,
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
        provider: true,
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
