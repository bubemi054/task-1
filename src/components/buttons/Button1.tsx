import React from "react";
import { twMerge } from "tailwind-merge";

type Button1Props = {
  className?: string;
  children: React.ReactNode;
  onClick?: (e: React.MouseEvent) => void;
};

export default function Button1({
  children,
  className,
  onClick,
}: Button1Props) {
  return (
    <button
      onClick={onClick}
      className={twMerge(
        "font-manrope inline-flex cursor-pointer items-center justify-center truncate rounded-lg bg-white px-2 py-2 text-sm leading-normal font-bold text-black transition-all duration-200 hover:bg-gray-200 sm:px-6 sm:text-base lg:text-lg",
        className,
      )}
    >
      {children}
    </button>
  );
}
