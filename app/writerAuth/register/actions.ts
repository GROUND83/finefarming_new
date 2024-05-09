"use server";
import bcrypt from "bcrypt";
import {
  PASSWORD_ERROR_MESSAGE,
  PASSWORD_MIN_LENGHT,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constants";
import db from "@/lib/db";
import { z } from "zod";
import { formSchema } from "./registerSchema";
import { notFound, redirect } from "next/navigation";

export async function createAccount(formdata: FormData) {
  //
  const data = {
    email: formdata.get("email"),
    password: formdata.get("password"),
    confirmPassword: formdata.get("confirmPassword"),
    phone: formdata.get("phone"),
    username: formdata.get("username"),
  };

  //   }
  const result = await formSchema.safeParseAsync(data);
  if (!result.success) {
    console.log(result.error.flatten());
    return result.error.flatten();
  } else {
    console.log(result.data);
    const hashedPasswrod = await bcrypt.hash(result.data.password, 12);

    let data = {
      username: result.data.username,
      phone: result.data.phone,
      email: result.data.email,
      password: hashedPasswrod,
    };
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/create`,
      {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    console.log("res", res);
    if (res.status == 200) {
      redirect("/");

      // registration success
    } else {
      notFound();
      //registration faled
    }

    // redirect("/profile");
  }
}
