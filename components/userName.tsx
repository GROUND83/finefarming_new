"use client";
import getManager, { logOut } from "@/app/admin/actions";

import { notFound, redirect } from "next/navigation";
import { Button } from "./ui/button";
import React from "react";
import { ArrowRightStartOnRectangleIcon } from "@heroicons/react/24/outline";
import { Badge } from "./ui/badge";
import { getSession, signOut } from "next-auth/react";
import Link from "next/link";

export function ManagerAuth() {
  const [user, setUser] = React.useState<any>();
  //await new Promise((resolve) => setTimeout(resolve, 10000));
  const getUer = async () => {
    let session = await getSession();
    if (session) {
      setUser(session.user);
    }
  };
  const logOutClick = async () => {
    await signOut();
  };
  React.useEffect(() => {
    getUer();
  }, []);
  return (
    <div className="flex flex-col  items-start gap-3py-6">
      {user && (
        <>
          <Link
            className="flex flex-col items-start gap-1 w-full "
            href={"/admin/profile"}
          >
            {user.role === "manager" && <Badge>매니저</Badge>}
            {user.role === "superAdmin" && <Badge>슈퍼어드민</Badge>}
            <span className="text-sm mt-3">{user?.username}</span>
            <div className="text-wrap  w-full">
              <p className="text-xs text-neutral-500 break-words ">
                {user?.email}
              </p>
            </div>
          </Link>
        </>
      )}
    </div>
  );
}
