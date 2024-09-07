import Footer from "@/components/footerWrap";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import db from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

//
async function getMagazine() {
  //
  //   await new Promise((resolve) => setTimeout(resolve, 10000));
  const magazines = await db.magazine.findMany({
    where: {
      visible: true,
    },
    include: {
      author: {
        select: {
          username: true,
          avatar: true,
          intruduceTitle: true,
        },
      },
    },
    orderBy: {
      order: "asc",
    },
  });
  return magazines;
}

export const metadata: Metadata = {
  title: "농업체험 추천 후기 - 파인파밍",
  description: "파인파밍에서 추천하는 농업체험의 유익한 가치를 알아보는 공간",
  keywords: [
    "체험후기",
    "농업체험 추천글",
    "체험추천 후기",
    "육아 인플루언서 후기",
    "농업체험 후기",
    "농장체험 후기",
    "농촌체험 후기",
    "수확체험 후기",
  ],
  alternates: {
    canonical: `https://www.finefarming.co.kr/magazine`,
  },
};
export default async function Page({
  params,
}: {
  params: { productId: string };
}) {
  const magazines = await getMagazine();
  if (!magazines) {
    return notFound();
  }
  console.log("magazines", magazines);
  return (
    <article className="w-full bg-white ">
      <div className="w-full  container mx-auto min-h-screen p-3 ">
        <header className="p-3">
          <h1 className="text-2xl lg:text-3xl font-semibold">
            농업체험의 유익한 가치를
            <br /> 알아보는 공간
          </h1>
        </header>
        <div className="w-full grid grid-cols-12 gap-3  p-3  min-h-screen mt-3 ">
          {magazines.map((magazine, index) => {
            return (
              <section
                key={index}
                className=" col-span-12 lg:col-span-6 bg-white"
              >
                <Link href={`/magazine/${magazine.id}`}>
                  <div className=" relative w-full aspect-square flex flex-col items-center justify-center  ">
                    <Image
                      src={magazine.image}
                      fill
                      alt={magazine.title}
                      className="z-10 bg-cover brightness-75"
                      sizes="(min-width: 768px) 50vw, (min-width: 1440) 100vw, 100vw"
                    />
                    <div className="backdrop-blur-md bg-black/10 z-20 absolute w-[70%] h-[40%] p-6  flex flex-col items-center justify-center gap-3">
                      <header className="flex flex-col items-center">
                        {/* <p className="text-xl text-neutral-400">
                          #{magazine.id}
                        </p> */}
                        <h2 className="text-md text-center text-white">
                          {magazine.title}
                        </h2>
                      </header>
                      <div className="flex flex-row items-center gap-3 mt-6 text-xs text-white">
                        {magazine.author.avatar && (
                          <Avatar>
                            <AvatarImage src={magazine.author?.avatar} />
                          </Avatar>
                        )}
                        <div className="text-white">
                          <p>{magazine.author.username}</p>
                          <p>{magazine.author.intruduceTitle}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </section>
            );
          })}
        </div>
      </div>
    </article>
  );
}
