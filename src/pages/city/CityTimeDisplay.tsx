// @ts-expect-error Need React imported for my tests
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
    <div className="flex h-[297px] w-[312px] flex-col items-center justify-center gap-[20px] rounded-[15px] bg-[rgba(0,0,0,0.2)] backdrop-blur-[20px] [@media(max-width:550px)]:w-[100%]">
      <span className="text-[36px] font-bold text-white">{cityName}</span>
      <div className="flex flex-col items-center">
        <span className="text-[70px] font-bold text-white">{time}</span>
        <span className="text-[20px] font-normal text-white">{dateString}</span>
      </div>
    </div>
  );
}
