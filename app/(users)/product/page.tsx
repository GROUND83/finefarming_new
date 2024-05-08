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

export default function Page() {
  const [products, setProducts] = React.useState<any[]>([]);

  const getProductsData = async () => {
    let result = await getProducts();
    console.log("result", result);
    setProducts(result);
  };
  React.useEffect(() => {
    getProductsData();
  }, []);
  return (
    <div className="w-full container mx-auto ">
      <div className="w-full   relative  grid grid-cols-12 gap-6 p-6 ">
        {products.length > 0 &&
          products.map((item: any, index: any) => {
            return (
              <div
                key={index}
                className="bg-white  col-span-12  lg:col-span-4 flex flex-col items-start justify-start  rounded-md overflow-hidden border"
              >
                <div className="w-full  aspect-[4/3] relative bg-cover ">
                  {item.mainImage ? (
                    <Image
                      src={item.mainImage}
                      fill
                      priority
                      alt={item.title}
                      style={{ objectFit: "cover" }}
                    />
                  ) : (
                    <div className="w-full h-full bg-neutral-100"></div>
                  )}
                </div>
                <ProductTitleWrap
                  productId={item.id}
                  title={item.title}
                  description={item.description}
                  educationSubject={item.educationSubject}
                  showSubMenu={false}
                />

                <div className="px-6 pb-6 flex flex-col gap-6  w-full ">
                  <div className="w-full">
                    <Button asChild variant={"outline"} className="w-full">
                      <Link href={`/product/${item.id}`}>체험상품 보기</Link>
                    </Button>
                  </div>
                  <div className="flex flex-row items-center gap-3 ">
                    <Avatar>
                      <AvatarImage src={item.farm.mainImage} />
                    </Avatar>
                    <div className="flex flex-col items-start ">
                      <p className="text-sm font-semibold ">{item.farm.name}</p>
                      <p className="text-xs text-neutral-500 line-clamp-1">
                        {item.farm.address}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
}
