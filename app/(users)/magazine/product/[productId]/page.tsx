import { Avatar, AvatarImage } from "@/components/ui/avatar";
import db from "@/lib/db";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

//
async function getMagazine(productId: number) {
  //
  //   await new Promise((resolve) => setTimeout(resolve, 10000));
  const magazines = await db.magazine.findMany({
    where: {
      productId: productId,
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
  const id = Number(params.productId);
  if (isNaN(id)) {
    return notFound();
  }
  const magazines = await getMagazine(id);
  if (!magazines) {
    return notFound();
  }
  console.log("magazines", magazines);
  return (
    <div className="w-full p-3 bg-neutral-100">
      <div className="w-full grid grid-cols-12 gap-3">
        {magazines.map((magazine, index) => {
          return (
            <Link
              href={`/magazine/${magazine.id}`}
              key={index}
              className=" col-span-12 bg-white"
            >
              <div className=" relative w-full aspect-square flex flex-col items-center justify-center  ">
                <Image
                  src={magazine.image}
                  fill
                  priority
                  alt={magazine.title}
                  className=" bg-cover brightness-50"
                />
                <div className="bg-white z-50 absolute w-[60%] h-[60%] p-6  flex flex-col items-center justify-center gap-3">
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
  );
}
