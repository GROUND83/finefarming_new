import React, { Component } from "react";

interface MyComponentProps {
  title: string;
  sub: string | null;
}
export const FormTitle: React.FC<MyComponentProps> = ({ title, sub }) => {
  return (
    <div className="col-span-3">
      <h1 className="text-md font-semibold">{title}</h1>
      {sub && <p className="text-neutral-500  text-xs">{sub}</p>}
    </div>
  );
};

export const FormWrap = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="grid grid-cols-12 gap-6 w-full border-b pb-12">
      {children}
    </div>
  );
};

export const FormFooter = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-row items-center justify-end  w-full mt-6 gap-3">
      {children}
    </div>
  );
};
