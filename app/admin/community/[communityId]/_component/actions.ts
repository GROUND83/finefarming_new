"use server";
import db from "@/lib/db";
import getDateTime from "@/lib/getDateTime";
import { redirect } from "next/navigation";

export async function getCommunityDetail(communityId: number) {
  let community = await db.community.findUnique({
    where: {
      id: communityId,
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
