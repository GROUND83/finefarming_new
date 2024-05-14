"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

import { toast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import {
  adminDeleteCommunity,
  getCommunityDetail,
  updateCommunity,
} from "./_component/actions";
import { LinkPreview } from "@/components/linktoHtml";
import { DeleteButton } from "@/components/ButtonComponent";
import ReplyEdit from "./_component/replyEdit";
const FormSchema = z.object({
  visible: z.boolean(),
  isNotice: z.boolean().default(false),
  title: z.string(),
  content: z.string(),
  replys: z.array(
    z.object({
      id: z.number(),
      authorAvatar: z.string(),
      authorId: z.number(),
      authorName: z.string(),
      authorType: z.string(),
      depth: z.number(),
      title: z.string(),
      visible: z.boolean(),
    })
  ),
});
export default function Page({ params }: { params: { communityId: string } }) {
  const [preview, setPreview] = React.useState<any>("");
  const [deleteLoading, setDeleteLoading] = React.useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      visible: false,
      title: "",
      content: "",
      isNotice: true,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("Data", data);

    let newData = JSON.stringify({
      ...data,
      authorName: "매니저",
      autherId: session?.user.id,
      authorType: "manager",
      communityId: Number(params.communityId),
    });
    let result = await updateCommunity(newData);
    console.log("result", result);
    router.push("/admin/community");
    // setOpen(false);
  }
  const reload = async () => {
    const result = await getCommunityDetail(Number(params.communityId));
    console.log("result", result);
    form.reset({
      visible: result?.visible,
      title: result?.title,
      content: result?.content,
      isNotice: result?.isNotice,
      replys: result?.replys,
    });
    setPreview(result?.content);
  };

  React.useEffect(() => {
    if (params.communityId) {
      reload();
    }
  }, [params.communityId]);

  const clickDelelte = async () => {
    //
    let result = await adminDeleteCommunity(Number(params.communityId));
  };
  return (
    <div className="w-full  p-3  ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6 border p-6 rounded-md"
        >
          <div>
            <h3 className="mb-4 text-lg font-medium">커뮤니티 </h3>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="visible"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center  space-y-0 gap-2 ">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    {field.value ? (
                      <FormLabel className="text-base">공개</FormLabel>
                    ) : (
                      <FormLabel className="text-base">비공개</FormLabel>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isNotice"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center  space-y-0 gap-2 ">
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <FormLabel className="text-base">공지사항</FormLabel>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="flex flex-col items-start justify-between  ">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">제목</FormLabel>
                    </div>
                    <FormControl>
                      <Input
                        required
                        value={field.value}
                        onChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <div className="w-full flex flex-row items-start justify-between gap-2">
                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem className="flex flex-col items-startjustify-between  flex-1">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">내용</FormLabel>
                      </div>
                      <FormControl>
                        <Textarea
                          required
                          rows={10}
                          className=" resize-none"
                          value={field.value}
                          onChange={(e) => {
                            e.preventDefault();
                            field.onChange(e.target.value);
                            setPreview(e.target.value);
                          }}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="flex-1 flex flex-col items-start  justify-start h-full">
                  {preview && <LinkPreview content={preview} />}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center justify-between w-full">
            <DeleteButton
              onDelete={() => clickDelelte()}
              title={"커뮤니티 삭제"}
              description={"커뮤니티 삭제 시 댓글 모두 삭제 됩니다."}
              deleteLoading={deleteLoading}
            />
            <Button type="submit">수정</Button>
          </div>
        </form>
      </Form>
      <ReplyEdit communityId={params.communityId} />
    </div>
  );
}
