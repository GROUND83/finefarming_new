"use client";
import React, { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, XIcon } from "lucide-react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { createMatching } from "./actions";
import { useSession } from "next-auth/react";
const FormSchema = z.object({
  title: z.string(),
  content: z.string(),
});
export default function NewCommunity() {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = React.useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      title: "",
      content: "",
    },
  });
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("Data", data);
    setLoading(true);
    try {
      if (session?.user.username) {
        let newData = JSON.stringify({
          ...data,
          authorName: session?.user.username,
          autherId: session?.user.id,
          authorType: "user",
        });
        let result = await createMatching(newData);
        console.log("result", result);
      } else {
        // toast({
        //   title: "You submitted the following values:",
        //   description: (
        //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
        //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        //     </pre>
        //   ),
        // });
      }
    } catch (e) {
    } finally {
      setLoading(false);
      setOpen(false);
      window.location.reload();
    }
    // getBaseData();
  }
  const closeModal = () => {
    form.reset();
    setOpen(false);
  };
  return (
    <div className="">
      <Button
        type="button"
        size={"sm"}
        // href={"/admin/setting"}
        // className="text-primary underline"
        className="gap-2"
        onClick={() => setOpen(true)}
      >
        <PlusIcon className="size-4" />
        커뮤니티
      </Button>
      <Dialog open={open}>
        <DialogContent className="w-[80vw] rounded-md p-3 lg:p-12 flex flex-col items-start gap-6">
          <div className="flex flex-col items-end  w-full">
            <Button onClick={() => closeModal()} variant={"outline"}>
              <XIcon className="size-4" />
            </Button>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-6 lg:border p-6 rounded-md"
            >
              <div>
                <h3 className="mb-4 text-lg font-medium">커뮤니티</h3>
                <div className="space-y-4">
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
                  <FormField
                    control={form.control}
                    name="content"
                    render={({ field }) => (
                      <FormItem className="flex flex-col items-startjustify-between ">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">내용</FormLabel>
                        </div>
                        <FormControl>
                          <Textarea
                            required
                            rows={10}
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
              <Button type="submit">
                {loading ? <Loader2 className="size-4 animate-spin" /> : "생성"}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
