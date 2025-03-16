type SendIconProps = {
  className?: string;
  stroke?: string;
  onClick?: () => void
};

export default function SendIcon({ className, stroke, onClick }: SendIconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="18"
      height="17"
      viewBox="0 0 18 17"
      fill="none"
      className={className}
      onClick={onClick}
    >
      <path
        d="M11.2703 5.79036L7.21623 9.88776L2.60526 7.00377C1.94461 6.59043 2.08204 5.58693 2.8293 5.36841L13.7769 2.16238C14.4612 1.96182 15.0954 2.60159 14.8921 3.28808L11.6533 14.2281C11.4314 14.9764 10.4336 15.1101 10.0242 14.4466L7.21409 9.88848"
        stroke={stroke || "white"}
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
