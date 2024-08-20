"use server";
import db from "@/lib/db";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";

export async function getMatchDetail(matchId: string) {
  const product = await db.matching.findUnique({
    where: {
      id: Number(matchId),
    },
    include: {
      user: {
        select: {
          id: true,
          username: true,
          email: true,
          phone: true,
        },
      },
    },
  });
  if (product) {
    return product;
  } else {
    redirect("/not-found");
  }
}
export async function deleteMathch(matchId: string) {
  const product = await db.matching.delete({
    where: {
      id: Number(matchId),
    },
  });
  if (product) {
    return product;
  } else {
    redirect("/not-found");
  }
}

export async function updateMatch(data: string) {
  //
  let parserData = JSON.parse(data);
  try {
    //
    let match = db.matching.update({
      where: {
        id: parserData.id,
      },
      data: {
        id: parserData.id,
        title: parserData.title,
        description: parserData.description,
        region: parserData.region,
        number: Number(parserData.number),
        preference: parserData.preference,
        spent: parserData.spent,
        startDate: parserData.dob.from,
        endDate: parserData.dob.to,
        lastDate: parserData.lastDate,
        authorName: parserData.authorName,
        authorPhone: parserData.authorPhone,
        authorEmail: parserData.authorEmail,
        visible: parserData.visible,
      },
    });
    return { data: match };
  } catch (e) {
    //
    return { error: e };
  }
}
