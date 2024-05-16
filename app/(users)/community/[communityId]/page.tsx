import { UserLinkPreview } from "@/components/linktoHtml";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import db from "@/lib/db";

import {
  ArrowLeftCircleIcon,
  ArrowLeftIcon,
  ChatBubbleLeftEllipsisIcon,
} from "@heroicons/react/24/outline";
import dayjs from "dayjs";
import { MoveLeft } from "lucide-react";
import Link from "next/link";

import { notFound } from "next/navigation";
import Reply from "./_component/reply";
import NewReply from "./_component/newReply";
import { getSession } from "next-auth/react";
import DeleteCommunity from "./_component/deleteCommunity";

async function getIsOwner() {
  const session = await getSession();
  console.log("getIsOwner", session);
  // if (session.id) {
  //   return session.id === authorId;
  // }
  return false;
}

async function getCommunity(id: number) {
  //
  //   await new Promise((resolve) => setTimeout(resolve, 10000));
  const community = await db.community.findUnique({
    where: {
      id,
    },
  });
  return community;
}

export default async function Page({
  params,
}: {
  params: { communityId: string };
}) {
  const id = Number(params.communityId);
  if (isNaN(id)) {
    return notFound();
  }
  const community = await getCommunity(id);
  console.log("community", community, params.communityId);
  if (!community) {
    return notFound();
  }
  const isMine = await getIsOwner();
  return (
    <div className="w-full lg:container mx-auto p-3 mt-3 ">
      <div className="w-full border-b   py-3 flex flex-row items-center justify-between ">
        <div className="flex flex-row gap-2 items-center">
          <ChatBubbleLeftEllipsisIcon className="size-6" />
          <p className="text-lg lg:text-xl font-semibold">커뮤니티</p>
        </div>
      </div>
      <div className="p-3 flex flex-col items-start gap-5 mt-3 w-full">
        {community.isNotice && <Badge>공지</Badge>}
        <p className="text-2xl font-semibold">{community.title}</p>
        <div className="flex flex-row items-center gap-3 text-base border-b w-full pb-6 ">
          <p className="">{community.authorName} </p>
          <p className="text-neutral-500">
            {dayjs(community.created_at).format("YYYY.MM.DD")}
          </p>
        </div>
        <div className="border w-full px-6 pt-6 rounded-md flex flex-col items-start gap-6">
          <UserLinkPreview content={community.content} />

          <div className=" border-t w-full py-3 flex  flex-row items-center justify-between">
            <NewReply depth={0} communityId={community.id} parentId={null} />
            <DeleteCommunity
              communityId={community.id}
              ahutorId={Number(community.autherId)}
            />
            {/* { community.autherId === } */}
          </div>
        </div>
      </div>

      <div className="p-3 flex flex-col items-start gap-5  w-full">
        <Reply communityId={params.communityId} />
      </div>
      <div className="mt-12">
        <Button asChild variant={"outline"}>
          <Link href="/community" className="flex flex-row items-center gap-2">
            <ArrowLeftIcon className="size-4" />
            뒤로가기
          </Link>
        </Button>
      </div>
    </div>
  );
}
