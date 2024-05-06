import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import db from "@/lib/db";
import dayjs from "dayjs";
import Image from "next/image";

async function getMagazine(id: string) {
  let magazine = await db.magazine.findUnique({
    where: {
      id: Number(id),
    },
    include: {
      author: {
        select: {
          username: true,
          avatar: true,
          intruduceTitle: true,
          link: true,
          intruduce: true,
        },
      },
    },
  });
  return magazine;
}
export default async function Page({
  params,
}: {
  params: { magazineId: string };
}) {
  const magazine = await getMagazine(params.magazineId);
  return (
    <div className="w-full bg-neutral-100">
      {magazine && (
        <div className="w-[350px]  p-3">
          <div className=" relative w-full  aspect-video">
            <Image
              src={magazine.image}
              alt={magazine.title}
              fill
              priority
              className="object-cover"
            />
          </div>
          <div className="bg-white py-6 px-3 flex flex-col items-start gap-2">
            <p className="text-xl font-semibold">{magazine.title}</p>
            <div className="flex flex-row items-center gap-3 h-4 text-neutral-500 text-sm">
              <div>
                <p>{magazine.author.username}</p>
              </div>
              <Separator orientation="vertical" />
              <div>
                <p>{dayjs(magazine.created_at).format("YYYY.MM.DD")}</p>
              </div>
            </div>
          </div>
          <div className="bg-white py-6 px-3 flex flex-col items-start gap-2 border-b mt-3 ">
            {magazine.sections.length > 0 &&
              magazine.sections.map((section: any, sectionIndex) => {
                return (
                  <div key={sectionIndex}>
                    {section && (
                      <div>
                        <p className=" font-semibold text-lg">
                          {section?.title}
                        </p>
                        {section.subtitle && (
                          <p className=" font-semibold text-md text-primary underline-offset-[-5px]    underline  decoration-[10px] decoration-primary/20 mt-6 ">
                            {section?.subtitle}
                          </p>
                        )}
                        <p className="text-sm mt-6 ">{section.description}</p>
                        {section.images.length > 0 && (
                          <div
                            className={`w-full grid grid-cols-2 gap-3 mt-6 `}
                          >
                            {section.images.map(
                              (image: any, imageIndex: any) => {
                                return (
                                  <div
                                    key={imageIndex}
                                    className={`${
                                      section.images.length === 1
                                        ? "col-span-2 aspect-[4/3]"
                                        : section.images.length === 2
                                        ? "col-span-1   aspect-square"
                                        : section.images.length === 3 &&
                                          imageIndex === 2
                                        ? "col-span-2 aspect-[4/3]"
                                        : section.images.length === 3 &&
                                          imageIndex !== 2
                                        ? "col-span-1 aspect-square"
                                        : "col-span-1 aspect-square"
                                    }   relative `}
                                  >
                                    <Image
                                      src={image}
                                      alt={section?.title}
                                      fill
                                      priority
                                      className=" object-cover"
                                    />
                                  </div>
                                );
                              }
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
          </div>
          <div className="bg-white py-6 px-3 flex flex-col items-start gap-2 mt-3 w-full">
            {magazine.suggestion.length > 0 && (
              <div className="w-full flex flex-col items-start gap-2">
                <p className="text-lg font-semibold">
                  체험을 추천 하는 <span className="text-primary">세가지</span>{" "}
                  이유
                </p>
                {magazine.suggestion.map((suggest: any, suggestIndex: any) => {
                  return (
                    <div
                      key={suggestIndex}
                      className="bg-neutral-100 w-full p-3 flex flex-row items-center gap-2"
                    >
                      <div className="w-[30px] h-[30px] bg-primary  flex flex-col items-center justify-center rounded-full text-white">
                        <p>{suggestIndex + 1}</p>
                      </div>
                      <p className="text-sm">{suggest.title}</p>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          <div className="bg-white flex flex-col items-start gap-2 mt-3 w-full">
            <div className=" relative w-full   aspect-square flex flex-col items-center justify-center ">
              <Image
                src={magazine.image}
                alt={magazine.title}
                fill
                priority
                className="object-cover brightness-50  "
              />
              {magazine.author && (
                <div className="bg-white w-[80%] h-[80%] absolute  rounded-md flex flex-col items-center justify-center p-3">
                  <div className="flex flex-col items-center gap-2">
                    <Avatar>
                      <AvatarImage
                        src={magazine?.author?.avatar || undefined}
                      />
                    </Avatar>
                    <p className=" font-semibold  text-sm">
                      {magazine.author.username}
                    </p>
                    <div className="flex flex-row items-center justify-center h-4 gap-2 text-neutral-500 text-xs">
                      <p className=" text-md">
                        {magazine.author.intruduceTitle}
                      </p>
                      <Separator orientation="vertical" />
                      <p className=" text-md">{magazine.author.link}</p>
                    </div>
                    <Separator orientation="horizontal" className="my-3" />

                    <p className="text-xs text-center w-full text-pretty px-3 ">
                      {magazine.author.intruduce}
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
