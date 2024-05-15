"use server";

import db from "./db";

export async function getUserData({
  userId,
  role,
}: {
  userId: number;
  role: string;
}) {
  if (role === "user") {
    let result = await db.user.findUnique({
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
    return result;
  } else if (role === "writer") {
    let result = await db.writer.findUnique({
      where: {
        id: userId,
      },
      select: {
        id: true,
        username: true,
        email: true,
        avatar: true,
        intruduce: true,
        intruduceTitle: true,
        provider: true,
        link: true,
      },
    });
    return result;
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
    return user;
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
    return user;
  } else if (userId && role === "farmer") {
    const user = await db.farmer.findUnique({
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
    return user;
  }
}
