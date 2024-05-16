import { PhotoIcon } from "@heroicons/react/24/solid";

export default function Loading() {
  return (
    <div className="animate-pulse flex flex-col gap-5 w-full  container mx-auto">
      <div className="flex justify-center items-center w-full h-[200px] bg-neutral-300" />
      <div className="container mx-auto flex flex-col gap-3">
        <div className="  flex justify-center items-center w-60 h-8 bg-neutral-300" />
        <div className="  flex justify-center items-center w-60 h-8 bg-neutral-300" />
        <div className="  flex justify-center items-center w-60 h-8 bg-neutral-300" />
        <div className="  flex justify-center items-center w-full  aspect-video bg-neutral-300" />
        <div className="  flex justify-center items-center w-60 h-8 bg-neutral-300" />
        <div className="  flex justify-center items-center w-60 h-8 bg-neutral-300" />
        <div className="  flex justify-center items-center w-60 h-8 bg-neutral-300" />
        <div className="  flex justify-center items-center w-60 h-8 bg-neutral-300" />
      </div>
    </div>
  );
}
