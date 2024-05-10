import bcrypt from "bcrypt";

import { Prisma } from "@prisma/client";
import db from "@/lib/db";
import type { NextApiRequest, NextApiResponse } from "next";
import getDateTime from "@/lib/getDateTime";
import { NextResponse } from "next/server";

export async function POST(req: any, res: any) {
  let errors = [];
  const body = await req.json();
  const { username, email, password, phone } = body;

  console.log(username, email, password, phone);
  if (!username || !email || !password) {
    errors.push("invalid inputs");
    return NextResponse.json({ errors: errors }, { status: 400 });
  }
  if (password.length < 4) {
    errors.push("password length should be more than 4 characters");
    return NextResponse.json({ errors: errors }, { status: 400 });
  }
  const hashedPasswrod = await bcrypt.hash(password, 12);
  try {
    const userCheck = await db.farmer.findUnique({
      where: {
        email,
      },
    });
    if (userCheck) {
      return NextResponse.json(
        { message: "이미 등록된 이메일입니다." },
        { status: 400 }
      );
    }

    const user = await db.farmer.create({
      data: {
        username,
        email,
        phone,
        password: hashedPasswrod,
        provider: "email",
        created_at: getDateTime(),
        updated_at: getDateTime(),
      },
    });
    console.log(user);
    if (user) {
      return NextResponse.json({ user });
    }
  } catch (e) {
    if (e instanceof Prisma.PrismaClientKnownRequestError) {
      if (e.code === "P2002") {
        return NextResponse.json({ message: e.message }, { status: 400 });
      }
      return NextResponse.json({ message: e.message }, { status: 400 });
    }
  }
}
