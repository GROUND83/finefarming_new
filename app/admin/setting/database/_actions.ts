"use server";

import db from "@/lib/db";

export async function getFarm() {
  let farm = await db.farm.findMany({
    include: {
      owner: true,
    },
    orderBy: {
      created_at: "desc", // 내림차순 최신순
    },
  });

  return farm;
}

export async function getProducts() {
  let farm = await db.product.findMany({
    include: {
      farm: true,
    },
    orderBy: {
      created_at: "desc", // 내림차순 최신순
    },
  });

  return farm;
}
export async function getReservations() {
  let farm = await db.reservation.findMany({
    include: {
      user: true,
      product: true,
    },
    orderBy: {
      created_at: "desc", // 내림차순 최신순
    },
  });

  return farm;
}
export async function getReviews() {
  let farm = await db.review.findMany({
    include: {
      user: true,
      product: true,
    },
    orderBy: {
      created_at: "desc", // 내림차순 최신순
    },
  });

  return farm;
}
export async function getMagazines() {
  let farm = await db.magazine.findMany({
    include: {
      author: true,
      product: true,
    },
    orderBy: {
      created_at: "desc", // 내림차순 최신순
    },
  });

  return farm;
}
export async function getSubscribers() {
  let farm = await db.subscriber.findMany({
    orderBy: {
      created_at: "desc", // 내림차순 최신순
    },
  });

  return farm;
}
export async function getFamers() {
  let farm = await db.farmer.findMany({
    orderBy: {
      created_at: "desc", // 내림차순 최신순
    },
  });

  return farm;
}
export async function getUser() {
  let farm = await db.user.findMany({
    orderBy: {
      created_at: "desc", // 내림차순 최신순
    },
  });

  return farm;
}
export async function getWriter() {
  let farm = await db.writer.findMany({
    orderBy: {
      created_at: "desc", // 내림차순 최신순
    },
  });

  return farm;
}
