import { DataTable } from "./components/table";

import Search from "./components/search/search";
import NewData from "./components/new/newData";
import NewCustomer from "./components/new/newData";

export default async function FarmerList() {
  return (
    <div className="w-full ">
      {/* <div className="w-full flex flex-row items-center justify-between bg-white px-2 py-2 rounded-md border gap-3">
        <Search />
        <NewCustomer />
      </div> */}
      <DataTable />
    </div>
  );
}
