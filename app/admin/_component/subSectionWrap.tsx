import { Loader2 } from "lucide-react";

export default function SubSectionWrap({
  children,
  isLoading,
}: {
  children: React.ReactNode;
  isLoading: boolean;
}) {
  return (
    <div className="w-full p-3  h-full">
      {isLoading ? (
        <div className="w-full min-h-[80vh] flex flex-col items-center justify-center ">
          <Loader2 className=" animate-spin size-9 text-primary" />
        </div>
      ) : (
        <>{children}</>
      )}
    </div>
  );
}
