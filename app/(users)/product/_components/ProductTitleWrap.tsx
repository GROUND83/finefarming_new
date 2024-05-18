"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpenIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import copy from "copy-to-clipboard";

type itemProp = {
  productId: number;
  title: string;
  description: string;
  educationSubject: any;
  showSubMenu: boolean;
};
export const ProductTitleWrap = ({
  productId,
  title,
  description,
  educationSubject,
  showSubMenu,
}: itemProp) => {
  const handleCopyClipBoard = (text: string) => {
    try {
      copy(text);
      // navigator.clipboard.writeText(text);
      alert("주소가 복사되었습니다.");
    } catch (error) {
      alert("주소 복사에 실패하였습니다.");
    }
  };
  return (
    <div className=" w-full p-6 ">
      <div className=" w-full flex flex-col items-start gap-1">
        <div className="flex flex-row items-start  w-full">
          <div className="flex-1 flex flex-col items-start ">
            <p className=" font-semibold text-lg lg:text-2xl">{title}</p>
            <p className=" text-neutral-500 text-sm lg:text-lg">
              {description}
            </p>
          </div>
        </div>
        {educationSubject.length > 0 && (
          <div className="flex flex-row items-center gap-2 flex-wrap">
            {educationSubject.map((item: any, index: any) => {
              return (
                <div key={index}>
                  <Badge>{item.tag}</Badge>
                </div>
              );
            })}
          </div>
        )}
        {showSubMenu && (
          <div className="flex flex-row items-center gap-2 mt-3 ">
            <div>
              <Button asChild variant={"outline"} size={"sm"}>
                <Link
                  href={`/magazine/product/${productId}`}
                  className="flex flex-row items-center gap-1"
                >
                  <BookOpenIcon className="size-4" />
                  <p>매거진 </p>
                </Link>
              </Button>
            </div>
            {/* <div>
              <Button asChild variant={"outline"} size={"sm"}>
                <Link
                  href={"/magazine"}
                  className="flex flex-row items-center gap-1"
                >
                  <BookOpenIcon className="size-4" />
                  <p>카카오공유 </p>
                </Link>
              </Button>
            </div> */}
            <div>
              <Button
                variant={"outline"}
                size={"sm"}
                className="flex flex-row gap-1 items-center"
                onClick={() =>
                  handleCopyClipBoard(
                    `https://finefarming.co.kr/product/${productId}`
                  )
                }
              >
                <BookOpenIcon className="size-4" />
                링크 복사
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
