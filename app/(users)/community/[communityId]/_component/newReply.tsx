"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { empty_avatar_url } from "@/lib/constants";
import { newReply } from "./actions";
import Link from "next/link";
const FormSchema = z.object({
  title: z.string(),
});
export default function NewReply({
  depth,
  communityId,
  parentId,
}: {
  depth: number;
  communityId: number;
  parentId: number | null;
}) {
  const [loading, setLoading] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const { data: session } = useSession();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
    },
  });
  async function onSubmit(formdata: z.infer<typeof FormSchema>) {
    console.log("Data", formdata, session);
    setLoading(true);
    try {
      if (session?.user.username) {
        let newData = JSON.stringify({
          ...formdata,
          communityId: communityId,
          authorName: session?.user.username,
          authorId: session?.user.id,
          authorType: "user",
          authorAvatar: session?.user.avatar ? session?.user.avatar : "",
          depth: depth,
          parentId: parentId ? parentId : null,
        });
        let result = await newReply(newData);
        console.log("result", result);
      } else {
        //
      }
    } catch (e) {
    } finally {
      setLoading(false);
      setOpen(false);
      form.reset();
      window.location.reload();
    }
  }

  return (
    <div className="w-full">
      {session?.user ? (
        <Dialog open={open}>
          <Button onClick={() => setOpen(true)} size={"sm"} variant={"outline"}>
            댓글
          </Button>
          <DialogContent className="w-[80vw] p-6 rounded-md">
            <div className="w-full flex flex-col items-end">
              <Button
                onClick={() => setOpen(false)}
                size={"sm"}
                variant={"outline"}
              >
                <XMarkIcon className="size-4" />
              </Button>
            </div>
            <div className="">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="w-full space-y-6 p-6 "
                >
                  <div>
                    <p className="text-lg font-medium">댓글 쓰기</p>
                    <FormDescription>
                      댓글은 본문 또는 상위 댓글 삭제 시 모두 삭제됩니다.
                    </FormDescription>
                    <div className="space-y-4 mt-3">
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem className="flex flex-col items-startjustify-between ">
                            <FormControl>
                              <Textarea
                                required
                                rows={5}
                                className=" resize-none"
                                value={field.value}
                                onChange={field.onChange}
                              />
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col items-end">
                    <Button type="submit">
                      {loading ? (
                        <Loader2 className="size-4 animate-spin" />
                      ) : (
                        "등록"
                      )}
                    </Button>
                  </div>
                </form>
              </Form>
            </div>
          </DialogContent>
        </Dialog>
      ) : (
        <div className="flex flex-row items-center gap-3 w-full justify-between">
          <p className="text-sm text-neutral-500">
            댓글 쓰기는 회원만 가능합니다.
          </p>
          <div>
            <Button asChild size={"sm"}>
              <Link href={"/auth/login"}>로그인</Link>
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
