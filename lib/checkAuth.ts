import { getServerSession } from "next-auth";
import getSession from "./session";
import { authOptions } from "./auth";

export async function getIsOwner(authorId: number) {
  const session = await getServerSession(authOptions);
  if (session) {
    console.log("serversession", session);
    return session;
  }
  return false;
}
