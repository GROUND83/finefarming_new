"use server";
import db from "@/lib/db";
import getDateTime from "@/lib/getDateTime";
import getSession from "@/lib/session";
import { notFound } from "next/navigation";

export async function getInitData(userId: number) {
  if (userId) {
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
    return { user, products };
  } else {
    return notFound();
  }
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
