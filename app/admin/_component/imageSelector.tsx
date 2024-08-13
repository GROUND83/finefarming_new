import Image from "next/image";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { XIcon } from "lucide-react";
import React from "react";
export default function ImageSelector({
  wholeImage,
  onChange,
  value,
  form,
}: {
  wholeImage: any;
  form: any;
  value: any;
  onChange: any;
}) {
  const [opne, setOpen] = React.useState(false);
  return (
    <Dialog open={opne}>
      <DialogTrigger asChild>
        <Button type="button" onClick={() => setOpen(true)} size="sm">
          {value ? "이미지 수정" : "이미지 선택"}
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[80vw] p-12">
        <DialogClose asChild className=" flex flex-col items-end w-full">
          <div>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setOpen(false)}
            >
              <XIcon className="size-4" />
            </Button>
          </div>
        </DialogClose>
        <DialogHeader>
          <DialogTitle>이미지 선택</DialogTitle>
          <DialogDescription>이미지를 선택하세요.</DialogDescription>
        </DialogHeader>
        <ScrollArea className="w-full h-[800px] mt-12">
          <div className="w-full grid grid-cols-12 gap-2">
            {wholeImage.map((item: any, index: any) => {
              //   console.log("item", item);
              return (
                <div
                  key={index}
                  className="flex flex-col items-center   col-span-4 "
                >
                  <div className=" aspect-square w-full relative ">
                    <Image
                      src={item}
                      fill
                      className="object-cover "
                      alt={`image${index}`}
                    />
                  </div>
                  <div className="w-full">
                    <Button
                      type="button"
                      className="w-full rounded-none"
                      onClick={() => {
                        onChange(item);
                        setOpen(false);
                      }}
                    >
                      선택
                    </Button>
                  </div>
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
