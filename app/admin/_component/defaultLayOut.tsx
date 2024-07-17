import SubTop from "@/components/subTop";

export default function DefaultLayOut({
  children,
  title,
  sub,
  newbutton,
  searchbutton,
  url,
}: {
  children: React.ReactNode;
  title: string;
  sub: string;
  newbutton: boolean | undefined;
  searchbutton: boolean | undefined;
  url: string | undefined;
}) {
  return (
    <div className="flex flex-col items-start   relative w-full  h-full  ">
      <div className="w-full  relative  top-0 left-0 z-50">
        <SubTop
          title={title}
          sub={sub}
          newbutton={newbutton || false}
          searchbutton={searchbutton || false}
          url={url}
        />
      </div>

      <div className=" flex flex-col items-start w-full  flex-1 mt-[70px] ">
        {children}
      </div>
    </div>
  );
}
