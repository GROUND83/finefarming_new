import { Button } from "@/components/ui/button";
import db from "@/lib/db";
import { AlignLeftIcon, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

async function getBannerId(bannerId: number) {
  const banners = await db.banner.findUnique({
    where: {
      id: bannerId,
    },
  });
  return banners;
}

export default async function Page({
  params,
}: {
  params: { bannerId: string };
}) {
  const banner = await getBannerId(Number(params.bannerId));
  if (!banner) {
    return notFound();
  }
  console.log("banner", banner);

  return (
    <article className="w-full bg-white">
      <div className="w-full  container mx-auto min-h-screen p-3 ">
        <header className="p-3">
          <p className=" font-semibold text-primary">
            {banner.type === "event" ? "EVENT" : "공지사항"}
          </p>
          <h1 className="text-2xl lg:text-3xl font-semibold">{banner.title}</h1>
        </header>
        <section className="p-6 flex flex-col items-start gap-3 border ">
          <p>{banner.period}</p>
          <p className=" whitespace-pre-line">{banner.description}</p>
          <p className=" whitespace-pre-line">{banner.detailDescription}</p>
        </section>
        <Button asChild variant={"outline"} className="mt-3">
          <Link href={"/"} className="flex flex-row items-center gap-2">
            <ArrowLeft />
            뒤로가기
          </Link>
        </Button>
      </div>
    </article>
  );
}
