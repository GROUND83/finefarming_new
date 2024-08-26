export default async function Page() {
  return (
    <div className="  ">
      <div className="container mx-auto  p-3 h-screen">
        <div className="p-12 border rounded-md bg-neutral-100 flex flex-row items-center justify-between ">
          <div className="flex flex-col items-center  justify-center  h-[200px] w-full gap-3">
            <h1 className=" font-bold text-2xl">접근 권한</h1>
            <p>체험매칭은 고객만 새글을 작성할수 있습니다.</p>
            {/* <p>관리자 및 농장주는 대쉬보드를 이용해 주세요.</p> */}
          </div>
        </div>
      </div>
    </div>
  );
}
