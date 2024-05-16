import Footer from "@/components/footerWrap";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import db from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

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
  });
  return magazines;
}
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
    <div className="w-full  ">
      <p></p>
      <div className="w-full grid grid-cols-12 gap-3 container mx-auto p-3  min-h-screen">
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
                  priority
                  alt={magazine.title}
                  className="z-10 bg-cover brightness-50"
                  sizes="(min-width: 768px) 50vw, (min-width: 1440) 100vw, 100vw"
                />
                <div className="bg-white z-20 absolute w-[70%] h-[70%] p-6  flex flex-col items-center justify-center gap-3">
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
      <Footer />
    </div>
  );
}
