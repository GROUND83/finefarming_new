import db from "@/lib/db";
import bcrypt from "bcrypt";
import { NextResponse } from "next/server";

export async function POST(req: any, res: any) {
  const body = await req.json();
  const { email, password } = body;

  try {
    const user = await db.user.findUnique({
      where: { email: email },
      select: {
        id: true,
        username: true,
        email: true,
        password: true,
        avatar: true,
        role: true,
      },
    });
    const ok = await bcrypt.compare(password, user!.password ?? "");
    if (ok) {
      return NextResponse.json(exclude(user, ["password"]), { status: 200 });
    } else {
      return NextResponse.json(
        { message: "invalid credentials" },
        { status: 401 }
      );
    }
  } catch (e: any) {
    console.log(e);
    throw new Error(e);
  }
}

function exclude(user: any, keys: any) {
  for (let key of keys) {
    delete user[key];
  }
  return user;
}
