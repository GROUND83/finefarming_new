import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from "next";
import { getMonthly } from "./_components/actions";
import { Button } from "@/components/ui/button";

async function getMonthlyData() {
  //
  //   await new Promise((resolve) => setTimeout(resolve, 10000));
  let result = await getMonthly();
  return result;
}

export async function generateMetadata(
  parent: ResolvingMetadata
): Promise<Metadata> {
  return {
    metadataBase: new URL("https://www.finefarming.co.kr"),
    alternates: {
      canonical: `/recommand`,
    },
    title: `월별체험`,
    description: `파인파밍에서 추천하는 월별 대표체험입니다.`,
    openGraph: {
      title: "월별체험",
      url: `https://www.finefarming.co.kr/recommand/`,
      siteName: "파인파밍",
      locale: "ko_KR",
      type: "website",
    },
  };
}
export default async function Page() {
  //

  const monthlys = await getMonthlyData();
  console.log("monthlys", monthlys);
  if (!monthlys) {
    return notFound();
  }
  return (
    <article className="w-full bg-white">
      <div className="w-full  container mx-auto min-h-screen p-3 ">
        <header className="p-3">
          <h1 className="text-2xl lg:text-3xl font-semibold">
            파인파밍에서 <br />
            추천하는 월별 대표체험입니다.
          </h1>
        </header>
        <div className="w-full grid grid-cols-12 gap-3 lg:gap-4 p-3 mt-3  ">
          {monthlys.length > 0 &&
            monthlys.map((item: any, index: any) => {
              return (
                <section
                  key={index}
                  className="col-span-12  lg:col-span-4 grid grid-cols-2  overflow-hidden border  "
                >
                  <div className="col-span-2 lg:col-span-2 aspect-[4/4] lg:aspect-square relative   p-3 ">
                    {item.image ? (
                      <Image
                        src={item.image}
                        priority
                        width={200}
                        height={200}
                        alt={item.month}
                        className=" object-cover w-full  aspect-[4/4] lg:aspect-square "
                        // sizes="(min-width: 768px) 50vw, (min-width: 1440) 100vw, 100vw"
                      />
                    ) : (
                      <div className="col-span-2 lg:col-span-1 aspect-[4/4] lg:aspect-square h-full bg-neutral-100"></div>
                    )}
                  </div>
                  <div className="col-span-2 lg:col-span-2 lg:px-3 py-3 px-3 lg:py-3 flex flex-col items-start justify-start bg-neutral-50 border-t">
                    <div>
                      <p className=" text-md">
                        <span className=" text-lg font-bold">{item.month}</span>{" "}
                        체험추천
                      </p>
                    </div>
                    {item.products.length > 0 ? (
                      <div className="w-full flex flex-col gap-1 mt-3">
                        <Button
                          asChild
                          variant={"backdelete"}
                          className="w-full"
                        >
                          <Link href={`/recommand/${item.id}`}>
                            자세히 보기
                          </Link>
                        </Button>
                      </div>
                    ) : (
                      <div className="w-full flex flex-col gap-1 mt-3">
                        <Button disabled variant={"outline"} className="w-full">
                          체험상품이 아직 없습니다.
                        </Button>
                      </div>
                    )}
                  </div>
                </section>
              );
            })}
        </div>
      </div>
    </article>
  );
}
