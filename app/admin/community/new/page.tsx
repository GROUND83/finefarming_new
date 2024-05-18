"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { createCommunity } from "./_component/actions";
import { useSession } from "next-auth/react";
import { LinkPreview } from "@/components/linktoHtml";
import { useRouter } from "next/navigation";
const FormSchema = z.object({
  isNotice: z.boolean().default(false),
  title: z.string(),
  content: z.string(),
});
export default function Page() {
  const [open, setOpen] = React.useState(false);
  const { data: session } = useSession();
  const [preview, setPreview] = React.useState<any>("");
  const router = useRouter();
  //
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
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
    });
    let result = await createCommunity(newData);
    console.log("result", result);
    router.push("/admin/community");
    // setOpen(false);
  }

  return (
    <div className=" w-full p-3">
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
                name="isNotice"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center  space-y-0 gap-2 ">
                    <FormLabel className="text-base">공지사항</FormLabel>

                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
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
          <Button type="submit">추가</Button>
        </form>
      </Form>
    </div>
  );
}
