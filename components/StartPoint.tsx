import { StarIcon } from "@heroicons/react/24/outline";
import { StarIcon as FillStartIcon } from "@heroicons/react/24/solid";

export default function StartPoint({ point }: { point: number }) {
  return (
    <div className="w-full flex flex-row items-center gap-2">
      {new Array(5).fill("").map((item, index) => {
        return (
          <div key={index} className="flex flex-row items-center gap-2">
            {index < point ? (
              <FillStartIcon className="size-4 text-primary" />
            ) : (
              <StarIcon className="size-4 text-primary" />
            )}
          </div>
        );
      })}
    </div>
  );
}
