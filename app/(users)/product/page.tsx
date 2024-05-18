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
  title: "체험 상품",
  description: "파인파밍에서 체험농장을 추천 합니다.",
};
async function getProductsData() {
  //
  //   await new Promise((resolve) => setTimeout(resolve, 10000));
  let result = await getProducts();
  return result;
}

export default async function Page() {
  const products = await getProductsData();
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
        <div className="w-full grid grid-cols-12 gap-3  p-3 mt-3  ">
          {products.length > 0 &&
            products.map((item: any, index: any) => {
              return (
                <section
                  key={index}
                  className="col-span-12  lg:col-span-6 grid grid-cols-2 gap-3 overflow-hidden  "
                >
                  <div className="col-span-2 lg:col-span-1 aspect-[4/3] lg:aspect-square relative   ">
                    {item.mainImage ? (
                      <Image
                        src={item.mainImage}
                        fill
                        alt={item.title}
                        style={{
                          objectFit: "cover",
                          objectPosition: "center center",
                        }}
                        sizes="(min-width: 768px) 50vw, (min-width: 1440) 100vw, 100vw"
                      />
                    ) : (
                      <div className="col-span-2 h-full bg-neutral-100"></div>
                    )}
                  </div>
                  <div className="col-span-2 lg:col-span-1 lg:px-3 py-3 lg:py-0 flex flex-col items-start justify-start ">
                    <div className="flex flex-col items-start flex-1 gap-2 ">
                      <p className=" font-semibold text-lg">{item.title}</p>
                      {item.educationSubject.length > 0 && (
                        <div className="flex flex-row items-center gap-2 flex-wrap">
                          {item.educationSubject.map(
                            (item: any, index: any) => {
                              return (
                                <div key={index}>
                                  <Badge className="text-xs">{item.tag}</Badge>
                                </div>
                              );
                            }
                          )}
                        </div>
                      )}
                      <p className=" text-neutral-500 text-sm text-pretty w-full flex-1">
                        {item.description}
                      </p>
                    </div>

                    <div className="w-full flex flex-col gap-1 mt-3">
                      <div className="flex flex-col items-start ">
                        <p className="text-sm font-semibold ">
                          {item.farm.name}
                        </p>
                        <p className="text-xs text-neutral-500 line-clamp-1">
                          {item.farm.sido} {item.farm.sigungu}
                        </p>
                      </div>

                      <Button asChild variant={"outline"} className="w-full">
                        <Link href={`/product/${item.id}`}>체험상품 보기</Link>
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
