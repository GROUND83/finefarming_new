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
