import { Badge } from "@/components/ui/badge";
import db from "@/lib/db";
import getSession from "@/lib/session";
import { ChatBubbleLeftEllipsisIcon } from "@heroicons/react/24/outline";
import dayjs from "dayjs";
import { notFound } from "next/navigation";

async function getIsOwner(authorId: number) {
  const session = await getSession();
  if (session.id) {
    return session.id === authorId;
  }
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
  if (!community) {
    return notFound();
  }
  console.log("community", community, params.communityId);
  return (
    <div className=" container mx-auto mt-3">
      <div className="w-full border-b  px-6 py-3 flex flex-row items-center justify-between ">
        <div className="flex flex-row gap-2 items-center">
          <ChatBubbleLeftEllipsisIcon className="size-6" />
          <p className="text-lg lg:text-xl font-semibold">커뮤니티</p>
        </div>
      </div>
      <div className="p-3 flex flex-col items-start gap-5 mt-3">
        {community.isNotice && <Badge>공지</Badge>}
        <p className="text-2xl font-semibold">{community.title}</p>
        <div className="flex flex-row items-center gap-3 text-base ">
          <p className="">{community.authorName} </p>
          <p className="text-neutral-500">
            {dayjs(community.created_at).format("YYYY.MM.DD")}
          </p>
        </div>
        <p className="text-pretty whitespace-pre-wrap">{community.content}</p>
      </div>
    </div>
  );
}
