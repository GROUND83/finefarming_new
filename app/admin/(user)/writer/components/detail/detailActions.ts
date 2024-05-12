"use server";
import db from "@/lib/db";
import { deleteSchema, editSchema } from "../new/editSchema";
import { Prisma } from "@prisma/client";
import { redirect } from "next/navigation";
import getDateTime from "@/lib/getDateTime";

export async function getDeatailData(id: number) {
  const writer = await db.writer.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      avatar: true,
      username: true,
      email: true,
      phone: true,
      approve: true,
      created_at: true,
      intruduce: true,
      intruduceTitle: true,
      link: true,
    },
  });
  if (writer) {
    console.log("manger", writer);
    return writer;
  } else {
    redirect("/not-found");
  }
}

export async function updateData(formData: FormData) {
  return new Promise(async (resolve, reject) => {
    const data = {
      id: Number(formData.get("id")),
      username: formData.get("username"),
      phone: formData.get("phone"),
      email: formData.get("email"),
      avatar: formData.get("avatar"),
      approve: formData.get("approve") === "true" ? true : false,
      link: formData.get("link"),
      intruduce: formData.get("intruduce"),
      intruduceTitle: formData.get("intruduceTitle"),
    };
    console.log("data", data);
    const result = await editSchema.safeParseAsync(data);
    console.log(result);
    if (!result.success) {
      console.log(result.error.flatten());
      return result.error.flatten();
    } else {
      if (data.id) {
        try {
          let response = await db.writer.update({
            where: {
              id: Number(data.id),
            },
            data: {
              username: result.data.username,
              email: result.data.email,
              phone: result.data.phone,
              avatar: result.data.avatar,
              approve: result.data.approve,
              link: result.data.link,
              intruduce: result.data.intruduce,
              intruduceTitle: result.data.intruduceTitle,
              updated_at: getDateTime(),
            },
          });
          console.log("response", response);
          return resolve(response);
        } catch (e: any) {
          if (e.code === "P2002") {
            let target: any[] = [...e.meta?.target];
            if (target.includes("phone")) {
              return reject("이미 사용중인 핸드폰번호 입니다.");
            } else if (target.includes("email")) {
            }
            return reject("이미 사용중인 이메일 입니다.");
          }
        }
      }
    }
  });
}

export async function deleteData(formData: FormData) {
  return new Promise(async (resolve, reject) => {
    const data = {
      id: Number(formData.get("id")),
    };
    console.log("data", data);
    const result = await deleteSchema.safeParseAsync(data);
    console.log(result);
    if (!result.success) {
      console.log(result.error.flatten());
      return result.error.flatten();
    } else {
      if (data.id) {
        try {
          let response = await db.writer.delete({
            where: {
              id: Number(data.id),
            },
          });
          console.log("response", response);
          return resolve(response);
        } catch (e) {
          if (e) {
            return reject(e);
          }
        }
      }
    }
  });
}
