"use client";
import db from "@/lib/db";
import getSession from "@/lib/session";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProducts } from "./_components/actions";
import React from "react";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProductTitleWrap } from "./_components/ProductTitleWrap";
import Footer from "../_components/footerWrap";
import { BookOpenIcon } from "@heroicons/react/24/outline";
import { Loader2 } from "lucide-react";

export default function Page() {
  const [products, setProducts] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(false);

  const getProductsData = async () => {
    setLoading(true);
    try {
      let result = await getProducts();
      console.log("result", result);
      setProducts(result);
    } catch (e) {
      //
    } finally {
      setLoading(false);
    }
  };
  React.useEffect(() => {
    getProductsData();
  }, []);
  return (
    <div className="w-full bg-white">
      {loading ? (
        <div className="w-full min-h-screen flex flex-col items-center justify-center">
          <Loader2 className="size-6 animate-spin text-primary" />
        </div>
      ) : (
        <div className="w-full  container mx-auto min-h-screen p-3 ">
          <div className="p-3">
            <p className="text-2xl lg:text-3xl font-semibold">
              파인파밍에서 <br />
              체험농장을 추천 합니다.
            </p>
          </div>
          <div className="w-full grid grid-cols-12 gap-3 container mx-auto p-3 mt-3  ">
            {products.length > 0 &&
              products.map((item: any, index: any) => {
                return (
                  <div
                    key={index}
                    className="col-span-12  lg:col-span-6 grid grid-cols-2 gap-3 overflow-hidden  "
                  >
                    <div className="col-span-2 lg:col-span-1 aspect-[4/3] lg:aspect-square relative   ">
                      {item.mainImage ? (
                        <Image
                          src={item.mainImage}
                          fill
                          priority
                          alt={item.title}
                          style={{ objectFit: "cover" }}
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
                                    <Badge className="text-xs">
                                      {item.tag}
                                    </Badge>
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
                          <Link href={`/product/${item.id}`}>
                            체험상품 보기
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
}
