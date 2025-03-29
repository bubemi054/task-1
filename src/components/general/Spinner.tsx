// @ts-expect-error Need React imported for my tests
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
        "flex h-[70%] items-center justify-center",
        className || "",
      )}
    >
      <ImSpinner7 className="animate-spin text-5xl text-white" />
    </div>
  );
}
