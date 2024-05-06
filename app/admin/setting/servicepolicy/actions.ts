"use server";

import db from "@/lib/db";
import getDateTime from "@/lib/getDateTime";

export async function createBaseServicePolicy(content: string) {
  //
  console.log(content);
  await db.servicePolicy.create({
    data: {
      content,
      created_at: getDateTime(),
      updated_at: getDateTime(),
    },
  });
  return;
}

export async function getServicePolicy() {
  //

  let data = await db.servicePolicy.findMany();
  console.log(data);
  return data;
}
export async function updateBaseServicePolicy(formData: FormData) {
  //
  //   console.log(content);
  let id = formData.get("id");
  let content = formData.get("content")?.toString();
  if (id && content) {
    if (content) {
      await db.servicePolicy.update({
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
