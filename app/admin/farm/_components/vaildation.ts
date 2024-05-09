"use server";
import db from "@/lib/db";

export async function cheackEmail(email: string) {
  const emaildata = await db.farmer.findUnique({
    where: {
      email,
    },
    select: {
      id: true,
    },
  });
  return emaildata;
}
// export async function checkPhone(phone: string) {
//   const phonedata = await db.farmer.findUnique({
//     where: {
//       phone,
//     },
//     select: {
//       id: true,
//     },
//   });
//   return phonedata;
// }
export const checkPassword = ({
  password,
  confirmPassword,
}: {
  password: string;
  confirmPassword: string;
}) => password === confirmPassword;
