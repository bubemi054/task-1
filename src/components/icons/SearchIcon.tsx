import React from "react";

type SearchIconProps = {
  className?: string;
};

export default function SearchIcon({ className }: SearchIconProps) {
  return (
    <svg
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      className={className}
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.75293 11.038C3.75293 7.157 6.91093 4 10.7919 4C14.6719 4 17.8299 7.157 17.8299 11.038C17.8299 14.919 14.6719 18.077 10.7919 18.077C6.91093 18.077 3.75293 14.919 3.75293 11.038ZM22.2479 21.497L17.6489 16.91C19.0049 15.329 19.8299 13.28 19.8299 11.038C19.8299 6.055 15.7749 2 10.7919 2C5.80793 2 1.75293 6.055 1.75293 11.038C1.75293 16.022 5.80793 20.077 10.7919 20.077C12.8139 20.077 14.6769 19.401 16.1839 18.274L20.8359 22.913L22.2479 21.497Z"
        fill="white"
        fillOpacity="0.5"
      />
    </svg>
  );
}
