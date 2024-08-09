import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from "next";
import { getMonthly } from "./_components/actions";
import { Button } from "@/components/ui/button";
export const metadata: Metadata = {
  title: "월별체험 상품",
  description: "파인파밍에서 월별체험 상품을 추천 합니다.",
};
async function getProductsData() {
  //
  //   await new Promise((resolve) => setTimeout(resolve, 10000));
  let result = await getMonthly();
  return result;
}

export default async function Page() {
  //

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
            월별 체험 상품을 추천 합니다.
          </h1>
        </header>
        <div className="w-full grid grid-cols-12 gap-3 lg:gap-4 p-3 mt-3  ">
          {products.length > 0 &&
            products.map((item: any, index: any) => {
              return (
                <section
                  key={index}
                  className="col-span-12  lg:col-span-4 grid grid-cols-2  overflow-hidden   "
                >
                  <div className="col-span-2 lg:col-span-2 aspect-[4/4] lg:aspect-square relative   ">
                    {item.image ? (
                      <Image
                        src={item.image}
                        fill
                        alt={item.month}
                        style={{
                          objectFit: "contain",
                          // objectPosition: "center center",
                        }}
                        sizes="(min-width: 768px) 50vw, (min-width: 1440) 100vw, 100vw"
                      />
                    ) : (
                      <div className="col-span-2 lg:col-span-1 aspect-[4/4] lg:aspect-square h-full bg-neutral-100"></div>
                    )}
                  </div>
                  <div className="col-span-2 lg:col-span-2 lg:px-3 py-3 px-3 lg:py-3 flex flex-col items-start justify-start bg-neutral-50 border">
                    <div>
                      <p>{item.month} 체험상품</p>
                    </div>
                    <div className="w-full flex flex-col gap-1 mt-3">
                      <Button asChild variant={"outline"} className="w-full">
                        <Link href={`/recommand/${item.id}`}>자세히 보기</Link>
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
