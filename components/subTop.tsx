import { PlusIcon, SearchIcon } from "lucide-react";

import { ManagerAuth } from "./userName";
import { Button } from "./ui/button";
import Link from "next/link";
import { usePathname } from "next/navigation";
import NewFarmer from "@/app/admin/(user)/farmer/components/new/newData";
import NewManager from "@/app/admin/(user)/manager/components/new/newData";
import NewWriter from "@/app/admin/(user)/writer/components/new/newData";
import NewCustomer from "@/app/admin/(user)/customer/components/new/newData";
import NewFarm from "@/app/admin/farm/new/newData";
import NewReservation from "@/app/admin/reservation/_components/new/newData";
import NewCommunity from "@/app/admin/community/_component/newModal";
import NewMagazineModal from "@/app/admin/magazine/_commponent/new/newMagazineModal";
import NewCommunityUser from "@/app/admin/community/_component/newModal";

export default function SubTop({
  title,
  sub,
  newbutton,
  searchbutton,
  url,
}: {
  title: string;
  sub: string;
  newbutton: boolean;
  searchbutton: boolean;
  url: string | undefined;
}) {
  let pathname = usePathname();
  return (
    <div className="flex flex-col border-b h-[70px] justify-center fixed   w-[calc(100vw-220px)] bg-white">
      <div className="flex flex-row  items-center justify-between   px-3   w-full ">
        <div className=" ">
          <h1 className="font-semibold  text-md">{title}</h1>
          <p className="text-neutral-500 text-sm ">{sub}</p>
        </div>
        <div className="flex flex-row items-center gap-3">
          {searchbutton && (
            <div>
              <Button
                asChild
                variant={"outline"}
                size={"sm"}
                className="flex flex-row items-center justify-center gap-3 "
              >
                <Link href={`/admin/${url}/search`}>
                  <SearchIcon className="size-4" />
                  검색하기
                </Link>
              </Button>
            </div>
          )}
          {pathname === "/admin/farm" && <NewFarm />}
          {/* {pathname === "/admin/reservation" && <NewReservation />} */}
          {pathname === "/admin/farmer" && <NewFarmer />}
          {pathname === "/admin/writer" && <NewWriter />}
          {pathname === "/admin/customer" && <NewCustomer />}
          {pathname === "/admin/manager" && <NewManager />}
          {pathname === "/admin/community" && <NewCommunity />}

          {/* {pathname === "/admin/magazine" && <NewMagazineModal />} */}
          {/* {newbutton && (
            <div>
              <Button
                asChild
                size={"sm"}
                className="flex flex-row items-center justify-center gap-3 "
              >
                <Link href={`/admin/${url}/new`}>
                  <PlusIcon className="size-4" />

                  {url === "community" && "커뮤니티"}
                </Link>
              </Button>
            </div>
          )} */}
        </div>
      </div>
    </div>
  );
}
