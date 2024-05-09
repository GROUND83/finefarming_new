"use server";
import db from "@/lib/db";

export async function cheackEmail(email: string) {
  const emaildata = await db.manager.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  return emaildata;
}

export const checkPassword = ({
  password,
  confirmPassword,
}: {
  password: string;
  confirmPassword: string;
}) => password === confirmPassword;
