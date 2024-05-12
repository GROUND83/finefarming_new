"use server";
import db from "@/lib/db";
import getDateTime from "@/lib/getDateTime";
import getSession from "@/lib/session";
import { Prisma } from "@prisma/client";
import { notFound } from "next/navigation";

export async function getInitData(userId: number) {
  let user = await db.writer.findUnique({
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
      link: true,
    },
  });
  let products = await db.product.findMany({
    select: {
      id: true,
      title: true,
      farmId: true,
      farm: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  return { user, products };
}

export async function createMagazine(jsonData: string) {
  //
  if (jsonData) {
    let parserData = JSON.parse(jsonData);
    console.log("parserData", parserData);
    let product = await db.product.findUnique({
      where: {
        id: Number(parserData.productId),
      },
      select: {
        farmId: true,
      },
    });

    let result = await db.magazine.create({
      data: {
        product: {
          connect: {
            id: Number(parserData.productId),
          },
        },
        author: {
          connect: {
            id: Number(parserData.authorId),
          },
        },
        farm: {
          connect: {
            id: Number(product?.farmId),
          },
        },
        title: parserData.title,
        image: parserData.image,
        sections: parserData.sections,
        suggestion: parserData.suggestion,
        created_at: getDateTime(),
        updated_at: getDateTime(),
      },
    });
    return true;
  }
}

export async function getMagazineData(magazineId: string) {
  let id = Number(magazineId);
  console.log(id);
  let magazine = await db.magazine.findUnique({
    where: {
      id,
    },
    include: {
      author: {
        select: {
          id: true,
          username: true,
          intruduceTitle: true,
          avatar: true,

          intruduce: true,
          link: true,
        },
      },
    },
  });
  let products = await db.product.findMany({
    where: {
      visible: true,
    },
    select: {
      id: true,
      title: true,
      farmId: true,
      farm: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  });
  let author = await db.writer.findMany({
    where: {
      approve: true,
    },
    select: {
      id: true,
      username: true,
      intruduceTitle: true,
      avatar: true,
      intruduce: true,
      link: true,
    },
  });
  console.log("magazine", magazine);
  const sections = magazine?.sections as Prisma.JsonArray;
  return { products: products, magazine: { ...magazine, sections }, author };
}

export async function deleteMagazine(magazineId: string) {
  try {
    const deleteOne = await db.magazine.delete({
      where: {
        id: Number(magazineId),
      },
    });
    return deleteOne;
  } catch (e) {
    //
  } finally {
    //
  }
}
