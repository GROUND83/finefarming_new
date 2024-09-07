import Image from "next/image";
import { getProducts } from "./_components/actions";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Footer from "../../../components/footerWrap";
import type { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "농업체험 상품 추천 - 파인파밍",
  description: "파인파밍에서 체험농장을 추천 합니다.",
  keywords: [
    "체험예약",
    "농촌체험",
    "농장 체험 프로그램",
    "주말체험",
    "경기도 농산물 체험",
    "수도권 농장 체험",
    "도심 근교 농장 체험",
    "주말 농산물 수확체험",
    "가족 농장 체험",
  ],
  alternates: {
    canonical: `https://www.finefarming.co.kr/product`,
  },
};
async function getProductsData() {
  //
  //   await new Promise((resolve) => setTimeout(resolve, 10000));
  let result = await getProducts();
  return result;
}

export default async function Page() {
  const products = await getProductsData();
  console.log("products", products);
  if (!products) {
    return notFound();
  }
  return (
    <article className="w-full bg-white">
      <div className="w-full  container mx-auto min-h-screen p-3 ">
        <header className="p-3">
          <h1 className="text-2xl lg:text-3xl font-semibold">
            파인파밍에서 <br />
            체험농장을 추천 합니다.
          </h1>
        </header>
        <div className="w-full grid grid-cols-12 gap-3 lg:gap-4 p-3 mt-3  ">
          {products.length > 0 &&
            products.map((item: any, index: any) => {
              return (
                <section
                  key={index}
                  className="col-span-12  lg:col-span-6 grid grid-cols-2  overflow-hidden border  "
                >
                  <div className="col-span-2 lg:col-span-1 aspect-[4/3] lg:aspect-square relative   ">
                    {item.mainImage ? (
                      <Image
                        src={item.mainImage}
                        fill
                        alt={item.title}
                        // objectFit="cover"
                        className="object-cover"
                        // sizes="(min-width: 768px) 50vw, (min-width: 1440) 100vw, 100vw"
                      />
                    ) : (
                      <div className="col-span-2 h-full bg-neutral-100"></div>
                    )}
                    <div className="z-40 absolute top-3 left-0">
                      {item.status === "POSSIBLE" && (
                        <p className="bg-yellow-400 text-black px-3 py-1 text-sm  ">
                          예약가능
                        </p>
                      )}
                      {item.status === "FINISHED" && (
                        <p className="bg-neutral-800 text-white px-3 py-1 text-sm ">
                          예약종료
                        </p>
                      )}
                      {item.status === "TESTING" && (
                        <p className="bg-neutral-800 text-white px-3 py-1 text-sm ">
                          테스트
                        </p>
                      )}
                    </div>
                    <div className="z-40 absolute bottom-0 left-0 right-0 flex flex-col items-start bg-white/30 p-2 bg-opacity-10 backdrop-blur-xl ">
                      <div className=" ">
                        <p className="text-sm font-semibold text-black">
                          {item.farm.name}
                        </p>
                        <p className="text-xs text-black line-clamp-1">
                          {item.farm.sido} {item.farm.sigungu}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="col-span-2 lg:col-span-1 lg:px-3 py-3 px-3 lg:py-3 flex flex-col items-start justify-start bg-neutral-50 ">
                    <div className="flex flex-col items-start flex-1 gap-2 ">
                      <p className=" font-semibold text-lg">{item.title}</p>
                      <p className=" text-neutral-500 text-sm text-pretty w-full flex-1 line-clamp-3">
                        {item.description}
                      </p>
                      {item.educationSubject.length > 0 && (
                        <div className="flex flex-row items-center gap-2 flex-wrap">
                          {item.educationSubject.map(
                            (item: any, index: any) => {
                              return (
                                <div key={index}>
                                  <Badge className="" variant={"outline"}>
                                    {item.tag}
                                  </Badge>
                                </div>
                              );
                            }
                          )}
                        </div>
                      )}
                    </div>

                    <div className="w-full flex flex-col gap-1 mt-3">
                      <Button asChild variant={"outline"} className="w-full">
                        <Link href={`/product/${item.id}`}>자세히 보기</Link>
                      </Button>
                    </div>
                  </div>
                </section>
              );
            })}
        </div>
      </div>
    </article>
  );
}
