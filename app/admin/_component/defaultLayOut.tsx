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
    <div className="w-full  h-full">
      <SubTop
        title={title}
        sub={sub}
        newbutton={newbutton || false}
        searchbutton={searchbutton || false}
        url={url}
      />

      <div className="w-full">{children}</div>
    </div>
  );
}
