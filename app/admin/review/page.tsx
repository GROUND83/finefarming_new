import Search from "./search/page";
import { DataTable } from "./_component/table/table";

export default async function Page() {
  return (
    <div className="w-full p-2">
      {/* <div className="w-full flex flex-row items-center justify-between bg-white px-2 py-2 rounded-md border gap-3 ">
        <Search />

        <NewCommunityModal getBaseData={getBaseData} />
      </div> */}
      <div>
        <DataTable />
      </div>
    </div>
  );
}
