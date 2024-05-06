import { PhotoIcon } from "@heroicons/react/24/solid";

export default function Loading() {
  return (
    <div className=" w-full  flex-1 flex flex-col items-start   ">
      <div className="w-full  gap-3 flex-1   flex py-6 ">
        <div className="p-6 flex-1 border rounded-md bg-neutral-500"></div>
        <div className="w-full  p-6  col-span-8 bg-neutral-500 border rounded-md"></div>
      </div>
    </div>
  );
}
