import { Button } from "@/components/ui/button";
import Link from "next/link";
import { PlusIcon } from "lucide-react";
import db from "@/lib/db";
import { notFound } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
async function getEvents(productId: number) {
  const events = await db.event.findMany({
    where: {
      productId: productId,
    },
  });
  return events;
}

export default async function Page({
  params,
}: {
  params: { productid: string };
}) {
  const id = Number(params.productid);
  if (isNaN(id)) {
    return notFound();
  }
  const events = await getEvents(id);
  if (!events) {
    return notFound();
  }
  console.log("events", events);
  return (
    <div className=" w-full flex    flex-1 p-3">
      <div className="w-full  flex-1 flex flex-col items-start ">
        <div className="p-6 flex-1 border rounded-md  bg-white   flex flex-row items-center justify-between w-full  ">
          <div className="col-span-3">
            <h1 className="text-md font-semibold">이벤트</h1>
            <p className="text-neutral-500  text-xs">
              이벤트는 상품 하나당 1개만 공개하세요.
            </p>
          </div>
          <div>
            <Button asChild size="sm" variant={"outline"}>
              <Link href={"event/new"}>
                <PlusIcon className="size-4" />
                이벤트생성
              </Link>
            </Button>
          </div>
        </div>
        <div className="p-6 flex-1   bg-white   flex flex-col items-start justify-between w-full mt-3 gap-2 ">
          {events.length > 0 &&
            events.map((event, index) => {
              return (
                <div
                  key={index}
                  className="flex flex-row items-center w-full justify-between border rounded-md p-3"
                >
                  <div className="flex flex-row items-center gap-3">
                    {event.visible ? (
                      <Badge>공개</Badge>
                    ) : (
                      <Badge variant={"outline"}>비공개</Badge>
                    )}
                    <p>{event.title}</p>
                  </div>
                  <Button asChild variant={"outline"}>
                    <Link href={`event/detail/${event.id}`}>
                      <MagnifyingGlassIcon className="size-4" />
                    </Link>
                  </Button>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}
