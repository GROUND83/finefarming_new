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
import { toast } from "@/components/ui/use-toast";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { createCommunity } from "./actions";
const FormSchema = z.object({
  visible: z.boolean().default(false),
  title: z.string(),
  content: z.string(),
});
export default function NewCommunity() {
  const [open, setOpen] = React.useState(false);
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      visible: true,
      title: "",
      content: "",
    },
  });
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("Data", data);

    let newData = JSON.stringify({
      ...data,
      authorName: "관리자",
      autherId: 1,
      authorType: "manager",
    });
    let result = await createCommunity(newData);
    console.log("result", result);
    // getBaseData();
    setOpen(false);
    // toast({
    //   title: "You submitted the following values:",
    //   description: (
    //     <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //       <code className="text-white">{JSON.stringify(data, null, 2)}</code>
    //     </pre>
    //   ),
    // });
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
        <DialogContent className="w-[80vw] rounded-md p-12 flex flex-col items-start gap-6">
          <div className="flex flex-col items-end  w-full">
            <Button onClick={() => closeModal()} variant={"outline"}>
              <XIcon className="size-4" />
            </Button>
          </div>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-6 border p-6 rounded-md"
            >
              <div>
                <h3 className="mb-4 text-lg font-medium">커뮤니티</h3>
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="visible"
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
              <Button type="submit">추가</Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
