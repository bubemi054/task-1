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
        "text-white text-3xl not-italic font-extrabold leading-[normal]",
        className || ""
      )}
    >
      {children}
    </h1>
  );
}
