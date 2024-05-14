"use client";

import { useSession } from "next-auth/react";
import { deleteReply, getReply } from "./actions";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Loader2, ReplyIcon } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { empty_avatar_url } from "@/lib/constants";
import dayjs from "dayjs";
import { Separator } from "@/components/ui/separator";
import NewReply from "./newReply";
import { DeleteButton } from "@/components/ButtonComponent";

export default function Reply({ communityId }: { communityId: string }) {
  //
  const [loading, setLoading] = React.useState(false);
  const [deleteLoading, setDeleteLoading] = React.useState(false);
  const [replys, setReplys] = React.useState<any[]>([]);
  const { data: session } = useSession();
  console.log("reply session", session);

  const getReplyData = async () => {
    //
    let reply = await getReply(Number(communityId));
    console.log("reply", reply);
    setReplys(reply);
  };

  React.useEffect(() => {
    getReplyData();
  }, [communityId]);

  //

  //
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
    setDeleteLoading(true);
    console.log("communityReplyId", communityReplyId);
    let result = await deleteReply(communityReplyId);
    console.log("result", result);
    if (result?.message === "ok") {
      getReplyData();
    }
    setDeleteLoading(false);
  };
  return (
    <div className="w-full  h-full">
      {session ? (
        <div className="w-full flex flex-col items-start gap-1">
          {replys.length > 0 &&
            replys.map((reply, replyIndex) => {
              return (
                <div
                  key={replyIndex}
                  className="p-3  border rounded-md flex flex-col items-start gap-2 w-full "
                >
                  <>
                    <div className="flex flex-row items-center gap-2 w-full">
                      <div className="flex flex-row items-start gap-2 w-full justify-between">
                        <div className="flex flex-row items-center gap-2">
                          <Avatar>
                            <AvatarImage
                              src={
                                reply.authorAvatar
                                  ? reply.authorAvata
                                  : empty_avatar_url
                              }
                            />
                          </Avatar>
                          <div className="flex flex-col items-start">
                            <span className="text-sm font-semibold">
                              {reply.authorName}
                            </span>
                            <span className="text-sm text-neutral-500">
                              {dayjs(reply.created_at).format("YYYY.MM.DD")}
                            </span>
                          </div>
                        </div>

                        {checkIsMine(reply.authorId) && (
                          <div>
                            <DeleteButton
                              deleteLoading={deleteLoading}
                              title="작성한 댓글을 삭제 하겠습니까?"
                              description="삭제된 댓글은 복구되지 않습니다."
                              onDelete={() => clickDelete(reply.id)}
                            />
                          </div>
                        )}
                      </div>
                    </div>
                    <Separator
                      orientation="horizontal"
                      className=" space-y-4"
                    />
                    <div className="flex-1 flex  p-3 w-full">
                      <div className="flex-1">
                        <p className="text-sm text-pretty whitespace-pre-wrap">
                          {reply.title}
                        </p>
                      </div>
                      <div>
                        <NewReply
                          depth={1}
                          communityId={reply.communityId}
                          parentId={reply.id}
                        />
                      </div>
                    </div>
                    <Separator
                      orientation="horizontal"
                      className=" space-y-4"
                    />
                    <div className="flex flex-row items-start p-3 gap-2 w-full">
                      {reply.replys && (
                        <div className="flex flex-col items-start w-full  gap-2 ">
                          {reply.replys?.length > 0 && (
                            <div className="flex flex-row items-start w-full  gap-2 ">
                              <div>
                                <ReplyIcon className="size-4 rotate-180" />
                              </div>
                              <div className="flex flex-col items-start w-full  gap-2 ">
                                {reply.replys.map(
                                  (subReply: any, subIndex: any) => {
                                    return (
                                      <div
                                        key={subIndex}
                                        className={`w-full flex flex-col items-start gap-2 ${
                                          subIndex < reply.replys.length - 1 &&
                                          "border-b py-3"
                                        }`}
                                      >
                                        <div className="flex flex-row items-start gap-2 w-full justify-between">
                                          <div className="flex flex-row items-center gap-2">
                                            <Avatar>
                                              <AvatarImage
                                                src={
                                                  subReply.authorAvatar
                                                    ? subReply.authorAvata
                                                    : empty_avatar_url
                                                }
                                              />
                                            </Avatar>
                                            <div className="flex flex-col items-start">
                                              <span className="text-sm font-semibold">
                                                {subReply.authorName}
                                              </span>
                                              <span className="text-sm text-neutral-500">
                                                {dayjs(
                                                  subReply.created_at
                                                ).format("YYYY.MM.DD")}
                                              </span>
                                            </div>
                                          </div>
                                          {checkIsMine(subReply.authorId) && (
                                            <div>
                                              <DeleteButton
                                                deleteLoading={deleteLoading}
                                                title="작성한 댓글을 삭제 하겠습니까?"
                                                description="삭제된 댓글은 복구되지 않습니다."
                                                onDelete={() =>
                                                  clickDelete(subReply.id)
                                                }
                                              />
                                            </div>
                                          )}
                                        </div>
                                        <p className="text-sm  w-full text-pretty">
                                          {subReply.title}
                                        </p>
                                      </div>
                                    );
                                  }
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </>
                </div>
              );
            })}
        </div>
      ) : (
        <div>
          <p>로그인</p>
        </div>
      )}
    </div>
  );
}
