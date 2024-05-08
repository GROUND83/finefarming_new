"use client";
import { useSession } from "next-auth/react";

export default function Layou({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  let { data: session } = useSession();
  console.log("레이아웃 session", session);
  return <div className="w-full relative">{children}</div>;
}
