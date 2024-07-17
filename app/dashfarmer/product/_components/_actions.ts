"use server";
import db from "@/lib/db";

export async function getFarmer({ ownerId }: { ownerId: number }) {
  console.log("ownerId", ownerId);
  if (ownerId) {
    let owner = await db.farmer.findUnique({
      where: {
        id: ownerId,
      },
      include: {
        farm: true,
      },
    });

    return owner;
  } else {
    return null;
  }
}
export async function getProduct({ userId }: { userId: number }) {
  console.log("farmId", userId);
  if (userId) {
    let farmer = await db.farmer.findUnique({
      where: {
        id: userId,
      },
      include: {
        farm: { select: { id: true } },
      },
    });
    let farmfilterArray = [];
    if (farmer?.farm) {
      if (farmer?.farm.length > 0) {
        for (const farm of farmer?.farm) {
          farmfilterArray.push(farm.id);
        }
        console.log("farmer", farmer?.farm, farmfilterArray);
        let product = await db.product.findMany({
          where: {
            farmId: { in: farmfilterArray },
          },
          include: {
            farm: true,
          },
        });

        return { data: product };
      } else {
        return null;
      }
    } else {
      return null;
    }
  } else {
    return null;
  }
}
