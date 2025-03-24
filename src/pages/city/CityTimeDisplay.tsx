import React from "react";

type CityTimeDisplayProps = {
  cityName: string;
  time: string;
  dateString: string;
};

export default function CityTimeDisplay({
  cityName,
  time,
  dateString,
}: CityTimeDisplayProps) {
  return (
    <div className="[@media(max-width:550px)]:w-[100%] w-[312px] h-[297px] rounded-[15px] backdrop-blur-[20px] bg-[rgba(0,0,0,0.2)] flex flex-col justify-center items-center gap-[20px]">
      <span className="text-[36px] text-white font-bold">{cityName}</span>
      <div className="flex flex-col items-center">
        <span className="text-[70px] text-white font-bold">{time}</span>
        <span className="text-[20px] text-white font-normal">{dateString}</span>
      </div>
    </div>
  );
}
