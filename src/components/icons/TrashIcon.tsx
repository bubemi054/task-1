type TrashIconProps = {
  className?: string;
  stroke?: string;
  onClick?: () => void;
};

export default function TrashIcon({ className, onClick, stroke }: TrashIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="17"
      height="17"
      viewBox="0 0 17 17"
      fill="none"
      className={className}
      onClick={onClick}
      
    >
      <path
        d="M13.6887 6.70605C13.6887 6.70605 13.3041 11.4767 13.0809 13.4862C12.9747 14.446 12.3818 15.0084 11.4107 15.0261C9.56264 15.0594 7.71247 15.0616 5.86514 15.0226C4.93084 15.0035 4.34789 14.434 4.24376 13.4912C4.01922 11.4639 3.63672 6.70605 3.63672 6.70605"
        stroke={stroke || "black"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14.6682 4.4196H2.65625"
        stroke={stroke || "black"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.3537 4.41962C11.7976 4.41962 11.3188 4.02649 11.2097 3.48178L11.0376 2.62045C10.9313 2.22308 10.5715 1.94824 10.1614 1.94824H7.16299C6.75287 1.94824 6.39304 2.22308 6.28679 2.62045L6.11466 3.48178C6.00558 4.02649 5.52674 4.41962 4.9707 4.41962"
        stroke={stroke || "black"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
