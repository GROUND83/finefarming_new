"use client";

import React from "react";
import { getCommunityReply, updateCommunityReply } from "./actions";
import dayjs from "dayjs";
import { Button } from "@/components/ui/button";
import { ConfirmButton } from "@/components/ButtonComponent";

export default function ReplyEdit({ communityId }: { communityId: string }) {
  //
  const [replys, setReplys] = React.useState<any[]>([]);
  const getData = async () => {
    //
    let result = await getCommunityReply(Number(communityId));
    console.log("result", result);
    setReplys(result);
  };
  React.useEffect(() => {
    getData();
  }, [communityId]);
  const clickOpen = async ({
    id,
    visible,
  }: {
    id: number;
    visible: boolean;
  }) => {
    //
    let data = JSON.stringify({ id: id, visible: visible });
    let result = await updateCommunityReply(data);
    console.log("result", result);
    if (result) {
      window.location.reload();
    }
  };
  return (
    <div className="w-full  mt-3 ">
      {replys.length > 0 && (
        <div className="flex flex-col items-start w-full p-3 border mt-3 rounded-md">
          <p>댓글관리</p>
          {replys.map((item, index) => {
            return (
              <div key={index} className="flex flex-col w-full">
                <div className="flex flex-row items-center gap-2">
                  <p>{item.authorName}</p>
                  <p>{dayjs(item.create_at).format("YYYY.MM.DD HH:ss")}</p>
                </div>
                <div className="flex flex-row items-center w-full ">
                  <div className="flex-1">
                    <p>{item.title}</p>
                  </div>
                  {item.visible ? (
                    <ConfirmButton
                      onDelete={() =>
                        clickOpen({ id: item.id, visible: false })
                      }
                      buttonTitle={"비공개 전환"}
                      title={"비공개 전환 하겠습니까?"}
                      description={"비공개 전환은 댓글이 노출되지 않습니다."}
                      deleteLoading={false}
                    />
                  ) : (
                    <ConfirmButton
                      onDelete={() => clickOpen({ id: item.id, visible: true })}
                      buttonTitle={"공개 전환"}
                      title={"공개 전환 하겠습니까?"}
                      description={"공개 전환은 댓글이 노출 됩니다."}
                      deleteLoading={false}
                    />
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
