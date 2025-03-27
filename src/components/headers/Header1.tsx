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
        "text-2xl leading-tight font-extrabold text-white sm:text-3xl lg:text-4xl",
        className || "",
      )}
    >
      {children}
    </h1>
  );
}
