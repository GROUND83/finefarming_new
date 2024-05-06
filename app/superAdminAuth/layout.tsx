import {
  BookOpenIcon,
  BuildingStorefrontIcon,
  CalendarIcon,
  ChatBubbleLeftIcon,
  Cog6ToothIcon,
  CreditCardIcon,
  LifebuoyIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import getManager from "./actions";
import { redirect } from "next/navigation";

export default async function AdminLayOut({
  children,
}: {
  children: React.ReactNode;
}) {
  //
  // const checkAuth = async () => {
  //   await getManager();
  // };
  // checkAuth();
  console.log("어드민 레이아웃");
  return (
    <div className="w-full flex flex-row items-start h-screen">{children}</div>
  );
}
