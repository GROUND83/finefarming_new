"use client";
import {
  BookOpenIcon,
  BuildingStorefrontIcon,
  CalendarIcon,
  ChatBubbleLeftIcon,
  Cog6ToothIcon,
  CreditCardIcon,
  LifebuoyIcon,
  UserIcon,
} from "@heroicons/react/24/outline";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { ManagerAuth } from "@/components/userName";
import { getSession } from "next-auth/react";

export const superAdminMenu = [
  {
    title: "업체 관리",
    icon: <BuildingStorefrontIcon className="size-4" />,
    link: "farm",
    disable: false,
  },
  {
    title: "예약 관리",
    icon: <CalendarIcon className="size-4" />,
    link: "reservation",
    disable: false,
  },
  {
    title: "주문 내역",
    icon: <CreditCardIcon className="size-4" />,
    link: "order",
    disable: true,
  },
  {
    title: "리뷰 관리",
    icon: <ChatBubbleLeftIcon className="size-4" />,
    link: "review",
    disable: false,
  },
  {
    title: "매거진 관리",
    icon: <BookOpenIcon className="size-4" />,
    link: "magazine",
    disable: false,
  },
  {
    title: "사용자 관리",
    subMenu: [
      {
        title: "농장주",
        icon: <BookOpenIcon className="size-4" />,
        link: "farmer",
        disable: false,
      },
      {
        title: "매거진 작가",
        icon: <BookOpenIcon className="size-4" />,
        link: "writer",
        disable: false,
      },
      {
        title: "고객",
        icon: <BookOpenIcon className="size-4" />,
        link: "customer",
        disable: false,
      },
      {
        title: "관리자",
        icon: <BookOpenIcon className="size-4" />,
        link: "manager",
        disable: false,
      },
    ],
    icon: <UserIcon className="size-4" />,
    link: "farmer",
    disable: false,
  },
  {
    title: "커뮤니티 관리",
    icon: <LifebuoyIcon className="size-4" />,
    link: "community",
    disable: false,
  },
  {
    title: "사이트 관리",
    subMenu: [
      {
        title: "공휴일 관리",
        icon: <BookOpenIcon className="size-4" />,
        link: "setting/holidays",
        disable: false,
      },
      {
        title: "취소 및 환불정책",
        icon: <BookOpenIcon className="size-4" />,
        link: "setting/refund",
        disable: false,
      },
      {
        title: "개인 정보처리방침",
        icon: <BookOpenIcon className="size-4" />,
        link: "setting/personalpolicy",
        disable: false,
      },
      {
        title: "서비스 이용약관",
        icon: <BookOpenIcon className="size-4" />,
        link: "setting/servicepolicy",
        disable: false,
      },
      {
        title: "체험 도구 및 기타",
        icon: <BookOpenIcon className="size-4" />,
        link: "setting/farmitem",
        disable: false,
      },
    ],
    icon: <Cog6ToothIcon className="size-4" />,
    link: "farmer",
    disable: false,
  },
];
export const adminMenu = [
  {
    title: "업체 관리",
    icon: <BuildingStorefrontIcon className="size-4" />,
    link: "farm",
    disable: false,
  },
  {
    title: "예약 관리",
    icon: <CalendarIcon className="size-4" />,
    link: "reservation",
    disable: false,
  },
  {
    title: "주문 내역",
    icon: <CreditCardIcon className="size-4" />,
    link: "order",
    disable: true,
  },
  {
    title: "리뷰 관리",
    icon: <ChatBubbleLeftIcon className="size-4" />,
    link: "review",
    disable: false,
  },
  {
    title: "매거진 관리",
    icon: <BookOpenIcon className="size-4" />,
    link: "magazine",
    disable: false,
  },
  {
    title: "사용자 관리",
    subMenu: [
      {
        title: "농장주",
        icon: <BookOpenIcon className="size-4" />,
        link: "farmer",
        disable: false,
      },
      {
        title: "매거진 작가",
        icon: <BookOpenIcon className="size-4" />,
        link: "writer",
        disable: false,
      },
      {
        title: "고객",
        icon: <BookOpenIcon className="size-4" />,
        link: "customer",
        disable: false,
      },
    ],
    icon: <UserIcon className="size-4" />,
    link: "farmer",
    disable: false,
  },
  {
    title: "커뮤니티 관리",
    icon: <LifebuoyIcon className="size-4" />,
    link: "community",
    disable: false,
  },
  {
    title: "사이트 관리",
    subMenu: [
      {
        title: "공휴일 관리",
        icon: <BookOpenIcon className="size-4" />,
        link: "setting/holidays",
        disable: false,
      },
      {
        title: "취소 및 환불정책",
        icon: <BookOpenIcon className="size-4" />,
        link: "setting/refund",
        disable: false,
      },
      {
        title: "개인 정보처리방침",
        icon: <BookOpenIcon className="size-4" />,
        link: "setting/personalpolicy",
        disable: false,
      },
      {
        title: "서비스 이용약관",
        icon: <BookOpenIcon className="size-4" />,
        link: "setting/servicepolicy",
        disable: false,
      },
      {
        title: "체험 도구 및 기타",
        icon: <BookOpenIcon className="size-4" />,
        link: "setting/farmitem",
        disable: false,
      },
    ],
    icon: <Cog6ToothIcon className="size-4" />,
    link: "farmer",
    disable: false,
  },
];
export default function AdminLayOut({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = React.useState<any>();
  const getUserdata = async () => {
    let session = await getSession();
    if (session) {
      setUser(session.user);
    }
    console.log("user", session);
  };
  React.useEffect(() => {
    getUserdata();
  }, []);

  return (
    <div className="w-full flex flex-row  items-stretch relative">
      <div className="py-6 border-r-[1px]  bg-white  w-[220px] h-screen  relative">
        <div className="fixed top-0 left-0 h-full w-[220px]">
          <div className=" flex flex-col items-start gap-6 w-full px-6  ">
            <Link href={"/"} className=" relative  w-[80px] aspect-[5/3]">
              <Image src="/logo.svg" alt="logo" fill priority />
            </Link>
            {user?.role === "manager" ? (
              <div className="flex flex-col items-start gap-2  text-black  font-light text-sm w-full">
                {adminMenu.map((item, index) => {
                  return (
                    <div className="w-full" key={index}>
                      {item.subMenu ? (
                        <div className="w-full">
                          <p className="w-full  py-3 px-3 flex flex-row items-center gap-2  ">
                            {item.icon}
                            {item.title}
                          </p>
                          <div className="ml-3">
                            {item.subMenu.map((sub, subIndex) => {
                              return (
                                <div key={subIndex}>
                                  <Link
                                    href={`/admin/${sub.link}`}
                                    className="w-full  py-3 px-3 flex flex-row items-center gap-2  hover:bg-neutral-100  transition-colors"
                                  >
                                    {sub.icon}
                                    {sub.title}
                                  </Link>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ) : (
                        <div>
                          {item.disable ? (
                            <p className="w-full  py-3 px-3 flex flex-row items-center gap-2  text-neutral-400 transition-colors">
                              {item.icon}
                              {item.title}
                            </p>
                          ) : (
                            <Link
                              href={`/admin/${item.link}`}
                              className="w-full  py-3 px-3 flex flex-row items-center gap-2  hover:bg-neutral-100  transition-colors"
                            >
                              {item.icon}
                              {item.title}
                            </Link>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="flex flex-col items-start gap-2  text-black  font-light text-sm w-full">
                {superAdminMenu.map((item, index) => {
                  return (
                    <div className="w-full" key={index}>
                      {item.subMenu ? (
                        <div className="w-full">
                          <p className="w-full  py-3 px-3 flex flex-row items-center gap-2  ">
                            {item.icon}
                            {item.title}
                          </p>
                          <div className="ml-3">
                            {item.subMenu.map((sub, subIndex) => {
                              return (
                                <div key={subIndex}>
                                  <Link
                                    href={`/admin/${sub.link}`}
                                    className="w-full  py-3 px-3 flex flex-row items-center gap-2  hover:bg-neutral-100  transition-colors"
                                  >
                                    {sub.icon}
                                    {sub.title}
                                  </Link>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ) : (
                        <div>
                          {item.disable ? (
                            <p className="w-full  py-3 px-3 flex flex-row items-center gap-2  text-neutral-400 transition-colors">
                              {item.icon}
                              {item.title}
                            </p>
                          ) : (
                            <Link
                              href={`/admin/${item.link}`}
                              className="w-full  py-3 px-3 flex flex-row items-center gap-2  hover:bg-neutral-100  transition-colors"
                            >
                              {item.icon}
                              {item.title}
                            </Link>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
            <div className="w-full ">
              <ManagerAuth />
            </div>
          </div>
        </div>
      </div>
      <div className="  w-[calc(100vw-220px)]   absolute top-0 right-0 h-full ">
        {children}
      </div>
    </div>
  );
}
