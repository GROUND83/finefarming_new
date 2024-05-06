"use server";

import db from "@/lib/db";
import getDateTime from "@/lib/getDateTime";

export async function createBaseRefunPolicy(content: string) {
  //
  console.log(content);
  await db.refundPolicy.create({
    data: {
      content,
      created_at: getDateTime(),
      updated_at: getDateTime(),
    },
  });
  return;
}

export async function getRefundPolicy() {
  //

  let data = await db.refundPolicy.findMany();
  console.log(data);
  return data;
}
export async function updateBaseRefunPolicy(formData: FormData) {
  //
  //   console.log(content);
  let id = formData.get("id");
  let content = formData.get("content")?.toString();
  if (id && content) {
    if (content) {
      await db.refundPolicy.update({
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
