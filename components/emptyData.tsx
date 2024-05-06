import { NoSymbolIcon } from "@heroicons/react/24/solid";

export default function EmptyData({ title }: { title: string }) {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-neutral-100 border rounded-md gap-6">
      <NoSymbolIcon className="size-6 text-neutral-500" />
      <p className="text-neutral-500">{title} 없습니다.</p>
    </div>
  );
}
