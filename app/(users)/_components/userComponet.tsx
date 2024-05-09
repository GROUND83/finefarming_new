"use client";

import Link from "next/link";
import { getUser } from "../profile/_components/actions";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Drawer } from "vaul";

import { Button } from "@/components/ui/button";
import {
  Bars3Icon,
  BookOpenIcon,
  ChatBubbleLeftEllipsisIcon,
  MagnifyingGlassIcon,
  ReceiptPercentIcon,
  UserCircleIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { empty_avatar_url } from "@/lib/constants";

export function MobileUserComponet() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const [user, setUser] = React.useState<any>("");
  const { data: session } = useSession();

  React.useEffect(() => {
    console.log("session", session);
  }, [session]);
  return (
    <div className="flex flex-row items-center gap-3 ">
      <Drawer.Root direction="right" open={open}>
        <Drawer.Trigger asChild>
          <Button
            onClick={() => setOpen(true)}
            variant={"ghost"}
            className=" focus:outline-none outline-none"
          >
            <Bars3Icon className="size-6" />
          </Button>
        </Drawer.Trigger>
        <Drawer.Portal>
          <Drawer.Overlay
            className="fixed inset-0 bg-black/40 z-40"
            onClick={() => setOpen(false)}
          />
          <Drawer.Content className="bg-white flex flex-col rounded-t-[10px] h-full w-[80vw] mt-24 fixed bottom-0 right-0 z-50">
            <div className=" bg-white flex-1 h-full">
              <div className="w-full  flex flex-col items-start gap-3">
                {session?.user ? (
                  <Drawer.Title className=" mb-4 flex flex-row items-center gap-3 border-b px-6 py-6 w-full">
                    <Avatar>
                      <AvatarImage
                        src={
                          session?.user.avatar
                            ? session?.user.avatar
                            : empty_avatar_url
                        }
                      />
                    </Avatar>
                    <div>
                      <p className=" text-md">{session?.user.username}</p>
                      <p className="text-neutral-500 text-xs">
                        {session?.user.email}
                      </p>
                    </div>
                  </Drawer.Title>
                ) : (
                  <Drawer.Title className=" mb-4 flex flex-row items-center gap-3 border-b px-6 py-6 w-full">
                    <Button
                      asChild
                      className="w-full"
                      onClick={() => {
                        router.push("/auth/login");
                        setOpen(false);
                      }}
                    >
                      <p>시작하기</p>
                    </Button>
                  </Drawer.Title>
                )}
                <div className="w-full flex flex-col items-start gap-3 p-6">
                  {session?.user && (
                    <div className="w-full flex flex-col items-start ">
                      <Button
                        onClick={() => {
                          router.push("/profile");
                          setOpen(false);
                        }}
                        variant={"outline"}
                        className="w-full flex flex-row items-center justify-start gap-2"
                      >
                        <UserCircleIcon className="size-4" />
                        <span>나의 페이지</span>
                      </Button>
                    </div>
                  )}
                  <div className="w-full flex flex-col items-start ">
                    <Button
                      onClick={() => {
                        router.push("/product");
                        setOpen(false);
                      }}
                      variant={"outline"}
                      className="w-full flex flex-row items-center justify-start gap-2"
                    >
                      <MagnifyingGlassIcon className="size-4" />
                      <span>농장체험 </span>
                    </Button>
                  </div>
                  <div className="w-full flex flex-col items-start ">
                    <Button
                      onClick={() => {
                        router.push("/magazine");
                        setOpen(false);
                      }}
                      variant={"outline"}
                      className="w-full flex flex-row items-center justify-start gap-2"
                    >
                      <BookOpenIcon className="size-4" />
                      <span>매거진</span>
                    </Button>
                  </div>
                  <div className="w-full flex flex-col items-start ">
                    <Button
                      onClick={() => {
                        router.push("/community");
                        setOpen(false);
                      }}
                      variant={"outline"}
                      className="w-full flex flex-row items-center justify-start gap-2"
                    >
                      <ChatBubbleLeftEllipsisIcon className="size-4" />
                      <span>커뮤니티</span>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </Drawer.Content>
        </Drawer.Portal>
      </Drawer.Root>
    </div>
  );
}

export function UserComponet() {
  const [user, setUser] = React.useState<any>("");
  const { data: session } = useSession();

  React.useEffect(() => {
    console.log("session", session);
  }, [session]);
  return (
    <div className="flex flex-row items-center gap-3  ">
      {session?.user ? (
        <Link
          href={
            session.user?.role === "user"
              ? "/profile"
              : session?.user.role === "manager"
              ? "/admin/farm"
              : session?.user.role === "superAdmin"
              ? "/admin/farm"
              : session?.user.role === "writer"
              ? "/dashbordWriter"
              : "/"
          }
          className="  flex flex-row items-center gap-3  "
        >
          <Avatar>
            <AvatarImage
              src={
                session?.user.avatar ? session?.user.avatar : empty_avatar_url
              }
            />
          </Avatar>
          <div>
            <p className=" text-md">{session?.user.username}</p>
            <p className="text-neutral-500 text-sm">{session?.user.email}</p>
          </div>
        </Link>
      ) : (
        <div className="  flex flex-row items-center gap-3 ">
          <Button asChild variant={"outline"}>
            <Link href={"/auth/login"}>시작하기</Link>
          </Button>
        </div>
      )}
    </div>
  );
}
