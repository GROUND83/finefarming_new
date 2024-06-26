"use server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface SessionContent {
  id?: number;
  role: string;
}
export default async function getSession() {
  return getIronSession<SessionContent>(cookies(), {
    cookieName: "finefarming",
    password: process.env.COOKIE_PASSWORD!,
  });
}
