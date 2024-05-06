"use server";

import db from "@/lib/db";
import getDateTime from "@/lib/getDateTime";

export async function createBasePersonalPolicy(content: string) {
  //
  console.log(content);
  await db.personalPolicy.create({
    data: {
      content,
      created_at: getDateTime(),
      updated_at: getDateTime(),
    },
  });
  return;
}

export async function getPersonalPolicy() {
  //

  let data = await db.personalPolicy.findMany();
  console.log(data);
  return data;
}
export async function updateBasePersonalPolicy(formData: FormData) {
  //
  //   console.log(content);
  let id = formData.get("id");
  let content = formData.get("content")?.toString();
  if (id && content) {
    if (content) {
      await db.personalPolicy.update({
        where: {
          id: Number(id),
        },
        data: {
          content: content,
          updated_at: getDateTime(),
        },
      });
    }
    return;
  }
}
