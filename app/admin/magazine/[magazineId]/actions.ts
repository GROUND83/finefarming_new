"use server";
import db from "@/lib/db";
import getDateTime from "@/lib/getDateTime";

export async function updateMagazine(jsonData: string) {
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

    let result = await db.magazine.update({
      where: {
        id: parserData.magazineId,
      },
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

        updated_at: getDateTime(),
      },
    });
    return result;
  }
}
