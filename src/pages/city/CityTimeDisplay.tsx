// @ts-expect-error Need React imported for my tests
import React from "react";
import StarIcon from "../../components/icons/StarIcon";

type CityTimeDisplayProps = {
  cityId: number;
  cityName: string;
  time: string;
  dateString: string;
  toggleFavorite: (cityId: number) => void
  isFavorite: boolean;
};

export default function CityTimeDisplay({
  cityId,
  cityName,
  time,
  dateString,
  toggleFavorite,
  isFavorite,
}: CityTimeDisplayProps) {
  return (
    <div className="flex h-[297px] w-[312px] flex-col items-center justify-center gap-[20px] rounded-[15px] bg-[rgba(0,0,0,0.2)] backdrop-blur-[20px] [@media(max-width:550px)]:w-[100%]">
      <span>
        <StarIcon
          onClick={() => toggleFavorite(cityId)}
          fill={isFavorite ? "#F1CC51" : "none"}
          className="h-[30px] w-[30px]"
        />
      </span>
      <span className="text-[36px] font-bold text-white">{cityName}</span>
      <div className="flex flex-col items-center">
        <span className="text-[50px] font-bold text-white">{time} UTC</span>
        <span className="text-[20px] font-normal text-white">{dateString}</span>
      </div>
    </div>
  );
}
