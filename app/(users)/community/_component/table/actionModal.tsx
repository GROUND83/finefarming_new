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

const FormSchema = z.object({
  isNotice: z.boolean().default(false),
  title: z.string(),
  content: z.string(),
});
export default function ActionCommunityModal({ data }: { data: any }) {
  console.log("data", data);
  const [open, setOpen] = React.useState(false);

  const closeModal = () => {
    setOpen(false);
  };
  return (
    <div className="">
      <Button
        type="button"
        size={"sm"}
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
          {data && (
            <div>
              <p>{data.title}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
