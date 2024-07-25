import { Avatar, AvatarImage } from "@/components/ui/avatar";
import db from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata, ResolvingMetadata } from "next";
import Footer from "@/components/footerWrap";

async function getProduct(productId: string) {
  //
  //   await new Promise((resolve) => setTimeout(resolve, 10000));
  const product = await db.product.findUnique({
    where: {
      id: Number(productId),
    },
    include: {
      farm: true,
    },
  });
  return product;
}

async function getMagazine(productId: string) {
  //
  //   await new Promise((resolve) => setTimeout(resolve, 10000));
  const magazines = await db.magazine.findMany({
    where: {
      productId: Number(productId),
      visible: true,
    },
    include: {
      farm: true,
      author: {
        select: {
          username: true,
          avatar: true,
          intruduceTitle: true,
        },
      },
    },
  });
  return magazines;
}

type Props = {
  params: { productId: string };
};
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const product = await getProduct(params.productId);
  console.log("product", product);
  // optionally access and extend (rather than replace) parent metadata
  const previousImages = (await parent).openGraph?.images || [];

  return {
    metadataBase: new URL("https://www.finefarming.co.kr"),
    alternates: {
      canonical: "/",
    },
    title: `매거진 | ${product?.farm.name}`,
    description: `파인파밍에서 ${product?.farm.name}의 매거진을 소개합니다.`,
    openGraph: {
      title: product?.title!,
      url: `https://www.finefarming.co.kr/magazine/${product?.id!}`,
      siteName: "파인파밍",
      images: [
        {
          url: product?.mainImage!, // Must be an absolute URL
          width: 800,
          height: 600,
        },
      ],
      locale: "ko_KR",
      type: "website",
    },
  };
}
export default async function Page({ params }: Props) {
  const magazines = await getMagazine(params.productId);
  console.log(magazines);

  if (!magazines) {
    return notFound();
  }
  return (
    <section className="w-full  ">
      <div className="w-full  container mx-auto min-h-screen p-3 ">
        {magazines.length > 0 && (
          <header className="p-3">
            <h1 className="text-2xl lg:text-3xl font-semibold">
              파인파밍에서 <br />
              <span className="text-primary">
                {magazines[0].farm?.name}
              </span>의 <br />
              매거진을 소개 합니다.
            </h1>
          </header>
        )}
        <div className="w-full grid grid-cols-12 gap-3 p-3 mt-3  ">
          {magazines.map((magazine, index) => {
            return (
              <Link
                href={`/magazine/${magazine.id}`}
                key={index}
                className=" col-span-12 lg:col-span-6 bg-white"
              >
                <div className=" relative w-full aspect-square flex flex-col items-center justify-center  ">
                  <Image
                    src={magazine.image}
                    fill
                    alt={magazine.title}
                    className="z-10 bg-cover brightness-50"
                  />
                  <div className="bg-white z-20 absolute w-[60%] h-[60%] p-6  flex flex-col items-center justify-center gap-3">
                    <p className="text-xl text-neutral-400">#{magazine.id}</p>
                    <p className="text-md text-center">{magazine.title}</p>
                    <div className="flex flex-row items-center gap-3 mt-6 text-xs">
                      {magazine.author.avatar && (
                        <Avatar>
                          <AvatarImage src={magazine.author?.avatar} />
                        </Avatar>
                      )}
                      <div className="text-neutral-500">
                        <p>{magazine.author.username}</p>
                        <p>{magazine.author.intruduceTitle}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <Footer />
    </section>
  );
}
