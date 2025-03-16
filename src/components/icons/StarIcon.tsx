import { twMerge } from "tailwind-merge";

type StarIconProps = {
  className?: string;
  onClick?: () => void;
  fill?: string;
};

export default function StarIcon({ className, onClick, fill }: StarIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="18"
      viewBox="0 0 17 18"
      fill={fill || "none"}
      className={twMerge("cursor-pointer", className)}
      onClick={onClick}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M5.77926 4.25508L8.30907 5.42842C8.55726 5.54374 8.84773 5.52946 9.08642 5.38962L11.5213 3.96474C12.1231 3.61293 12.8587 4.09605 12.7665 4.78186L12.3953 7.55749C12.3589 7.83036 12.4591 8.10119 12.6636 8.28268L14.7426 10.1288C15.2565 10.5858 15.0143 11.4394 14.3322 11.5728L11.5736 12.1149C11.3031 12.1679 11.0739 12.3505 10.961 12.6026L9.81468 15.1697C9.53194 15.8046 8.64572 15.8494 8.31601 15.2457L6.98204 12.8064C6.85098 12.5665 6.60947 12.4082 6.33539 12.3825L3.54716 12.1224C2.85813 12.0586 2.55209 11.2334 3.02977 10.7258L4.96391 8.67201C5.15366 8.47071 5.23321 8.19038 5.17643 7.92266L4.5991 5.19474C4.45652 4.52011 5.15371 3.96499 5.77926 4.25508Z"
        stroke="#F1CC51"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
