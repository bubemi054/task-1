import React from "react";
import { ImSpinner7 } from "react-icons/im";
import { twMerge } from "tailwind-merge";

type SpinnerProps = {
  className?: string;
};

export default function Spinner({ className }: SpinnerProps) {
  return (
    <div
      className={twMerge(
        "flex items-center justify-center h-[70%] text-white",
        className || ""
      )}
    >
      <ImSpinner7 className="animate-spin text-5xl" />
    </div>
  );
}
