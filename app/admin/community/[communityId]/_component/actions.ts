"use server";
import db from "@/lib/db";
import getDateTime from "@/lib/getDateTime";
import { notFound, redirect } from "next/navigation";

export async function getCommunityDetail(communityId: number) {
  let community = await db.community.findUnique({
    where: {
      id: communityId,
    },
    include: {
      replys: {
        select: {
          id: true,
          authorAvatar: true,
          authorId: true,
          authorName: true,
          authorType: true,
          depth: true,
          title: true,
          visible: true,
        },
      },
    },
  });
  return community;
}

export async function updateCommunity(data: string) {
  console.log(data);
  let newdata = JSON.parse(data);
  let result = await db.community.update({
    where: {
      id: newdata.communityId,
    },

    data: {
      visible: newdata?.visible,
      title: newdata?.title,
      content: newdata?.content,
      isNotice: newdata?.isNotice,
      authorName: newdata.authorName,
      autherId: newdata.autherId,
      authorType: newdata.authorType,
      updated_at: getDateTime(),
    },
  });
  return result;
}
export async function adminDeleteCommunity(communityId: number) {
  let deleteCommunity = await db.community.delete({
    where: {
      id: communityId,
    },
  });
  if (deleteCommunity) {
    console.log("deleteCommunity", deleteCommunity);
    redirect("/admin/community");
  } else {
    notFound();
  }
}

export async function getCommunityReply(communityId: number) {
  let result = await db.communityReply.findMany({
    where: {
      communityId: communityId,
    },
  });
  return result;
}
export async function updateCommunityReply(data: string) {
  let { id, visible } = JSON.parse(data);
  console.log(id, visible);
  let result = await db.communityReply.update({
    where: {
      id: id,
    },
    data: {
      visible: visible,
      updated_at: getDateTime(),
    },
  });
  return result;
}
