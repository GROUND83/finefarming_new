import React, { Component } from "react";
//
interface WithOutContainerProps {
  children: React.ReactNode;
  className?: string;
}
export default function WithOutContainer({
  children,
  className,
}: WithOutContainerProps) {
  return <div className={`${className} `}>{children}</div>;
}
