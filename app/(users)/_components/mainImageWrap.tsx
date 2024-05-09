import Image from "next/image";
import React from "react";

export function ArticleHeader({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <header className="flex flex-col  items-center px-6 lg:px-0  py-12 lg:py-24  col-span-2 lg:container lg:mx-auto gap-2 ">
      <h1 className="text-primary  font-semibold text-lg">{title}</h1>
      {children}
    </header>
  );
}
export function ImageWrap({
  children,
  last,
}: {
  children: React.ReactNode;
  last: boolean;
}) {
  return (
    <div
      className={`col-span-2 lg:col-span-1  aspect-square  bg-cover relative ${
        last && "lg:order-last"
      }`}
    >
      {children}
    </div>
  );
}
export function ArticleDescription({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="col-span-2 lg:col-span-1 flex flex-col items-start justify-center gap-6   p-6 lg:p-12">
      {children}
    </div>
  );
}
