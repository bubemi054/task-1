import { twMerge } from "tailwind-merge";

type Header1Props = {
  children: React.ReactNode;
  className?: string;
};

export default function Header1({ children, className }: Header1Props) {
  return (
    <h1
      className={twMerge(
        "text-words dark:text-words-dark text-[28px] not-italic font-medium leading-9 px-[1.25rem] py-[1.25rem]",
        className || ""
      )}
    >
      {children}
    </h1>
  );
}
