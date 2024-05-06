import React, { Component } from "react";
//
interface WithContainerProps {
  children: React.ReactNode;
  className?: string;
}
export default function WithContainer({
  children,
  className,
}: WithContainerProps) {
  console.log("className", children);
  return (
    <div className={`w-full  `}>
      <div
        className={`container mx-auto bg-red-200  flex flex-row items-center justify-between w-full `}
      >
        {children}
      </div>
    </div>
  );
}
