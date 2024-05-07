import React from "react";

export default async function AdminLayOut({
  children,
}: {
  children: React.ReactNode;
}) {
  //
  // const checkAuth = async () => {
  //   await getManager();
  // };
  // checkAuth();
  // console.log("어드민 레이아웃");
  return (
    <div className="w-full flex flex-row items-start h-screen">{children}</div>
  );
}
