import React from "react";
import { twMerge } from "tailwind-merge";

type Header1Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Header1({ children, className }: Header1Props) {
  return (
    <h1
      className={twMerge(
        "text-white text-2xl sm:text-3xl lg:text-4xl font-extrabold leading-tight",
        className || ""
      )}
    >
      {children}
    </h1>
  );
}
