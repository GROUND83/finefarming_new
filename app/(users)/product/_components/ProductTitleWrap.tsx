import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BookOpenIcon } from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";

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
  return (
    <div className=" w-full p-6 ">
      <div className=" w-full flex flex-col items-start gap-1">
        <div className="flex flex-row items-start  w-full">
          <div className="flex-1 flex flex-col items-start ">
            <p className=" font-semibold text-lg">{title}</p>
            <p className=" text-neutral-500 text-sm">{description}</p>
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
            <div>
              <Button asChild variant={"outline"} size={"sm"}>
                <Link
                  href={"/magazine"}
                  className="flex flex-row items-center gap-1"
                >
                  <BookOpenIcon className="size-4" />
                  <p>카카오공유 </p>
                </Link>
              </Button>
            </div>
            <div>
              <Button asChild variant={"outline"} size={"sm"}>
                <Link
                  href={"/magazine"}
                  className="flex flex-row items-center gap-1"
                >
                  <BookOpenIcon className="size-4" />
                  <p>링크 복사</p>
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
