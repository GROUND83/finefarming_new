"use server";
import db from "@/lib/db";
import getDateTime from "@/lib/getDateTime";
import { connect } from "http2";

export async function getReply(communityId: number) {
  const replys = await db.communityReply.findMany({
    where: {
      communityId: communityId,
      visible: true,
    },
  });
  let parentArray = [] as any;
  replys.forEach((item: any) => {
    if (!item.parentId) {
      parentArray.push(item);
    } else {
      let findIndex = parentArray.findIndex(
        (it: any) => it.id === item.parentId
      );
      if (findIndex > -1) {
        if (parentArray[findIndex].replys?.length > 0) {
          parentArray[findIndex].replys = [
            ...parentArray[findIndex].replys,
            item,
          ];
        } else {
          parentArray[findIndex].replys = [];
          parentArray[findIndex].replys.push(item);
        }
      }
    }
  });
  console.log("parentArray", parentArray);

  return parentArray;
}

export async function newReply(data: string) {
  let paserData = JSON.parse(data);
  console.log("paserData", paserData);

  const replys = await db.communityReply.create({
    data: {
      title: paserData.title,
      parentId: paserData.parentId ? paserData.parentId : null,
      authorName: paserData.authorName,
      authorId: paserData.authorId,
      authorType: paserData.authorType,
      authorAvatar: paserData.authorAvatar,
      depth: paserData.depth,
      created_at: getDateTime(),
      updated_at: getDateTime(),
      community: {
        connect: {
          id: paserData.communityId,
        },
      },
    },
    include: {
      community: true, // Include all posts in the returned object
    },
  });
  return replys;
}

export async function deleteReply(communityId: number) {
  let deleteReply = await db.communityReply.delete({
    where: {
      id: communityId,
    },
  });
  return { message: "ok" };
}
export async function deleteCommunityAction(communityId: number) {
  let deleteReply = await db.community.delete({
    where: {
      id: communityId,
    },
  });
  return { message: "ok" };
}
