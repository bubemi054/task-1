type PlusIconProps = {
  className?: string;
  onClick?: () => void;
};

export default function PlusIcon({
  className,
  onClick,
}: PlusIconProps) {
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
        d="M8.50039 5.89844V11.0879"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M11.0978 8.49323H5.90332"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        fillRule="evenodd"
        clip-rule="evenodd"
        d="M11.8194 1.4165H5.18128C2.86739 1.4165 1.41699 3.05423 1.41699 5.37266V11.627C1.41699 13.9454 2.86064 15.5832 5.18128 15.5832H11.8194C14.14 15.5832 15.5837 13.9454 15.5837 11.627V5.37266C15.5837 3.05423 14.14 1.4165 11.8194 1.4165Z"
        stroke="black"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
