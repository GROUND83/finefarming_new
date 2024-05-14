"use client";

import { DeleteButton } from "@/components/ButtonComponent";
import { useSession } from "next-auth/react";
import React from "react";
import { deleteCommunityAction } from "./actions";
import { useRouter } from "next/navigation";

export default function DeleteCommunity({
  communityId,
  ahutorId,
}: {
  communityId: number;
  ahutorId: number;
}) {
  const [deleteLoading, setDeleteLoading] = React.useState(false);
  const { data: session } = useSession();
  const router = useRouter();
  const checkIsMine = (autherId: number) => {
    console.log(autherId, session?.user.id);
    if (autherId === session?.user.id) {
      return true;
    } else {
      return false;
    }
  };
  const clickDelete = async (communityReplyId: number) => {
    //
    try {
      setDeleteLoading(true);

      console.log("communityReplyId", communityReplyId);
      let result = await deleteCommunityAction(communityReplyId);
      console.log("result", result);
      router.push("/community");
    } catch (e) {
      //
    } finally {
      setDeleteLoading(false);
    }
  };
  return (
    <div>
      {checkIsMine(ahutorId) && (
        <DeleteButton
          deleteLoading={deleteLoading}
          title="작성한 커뮤니티를 삭제 하겠습니까?"
          description="커뮤니티의 댓글 모두 삭제 됩니다."
          onDelete={() => clickDelete(communityId)}
        />
      )}
    </div>
  );
}
