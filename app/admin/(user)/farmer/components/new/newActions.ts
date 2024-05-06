"use server";
import bcrypt from "bcrypt";
import db from "@/lib/db";
import { redirect } from "next/navigation";
import { newSchema } from "./newSchema";
import dayjs from "dayjs";
import getDateTime from "@/lib/getDateTime";
export async function upLoadData(formData: FormData) {
  const data = {
    username: formData.get("username"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirmPassword: formData.get("confirmPassword"),
    avatar: formData.get("avatar"),
  };

  const result = await newSchema.safeParseAsync(data);
  console.log(result);
  if (!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
  } else {
    const hashedPasswrod = await bcrypt.hash(result.data.password, 12);
    console.log("dayjs ", getDateTime());

    await db.farmer.create({
      data: {
        username: result.data.username,
        email: result.data.email,
        phone: result.data.phone,
        avatar: result.data.avatar,
        password: hashedPasswrod,
        created_at: getDateTime(),
        updated_at: getDateTime(),
      },
    });
    redirect("/admin/farmer");
  }
}
