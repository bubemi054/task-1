import React from "react";
import FavoriteCities from "./FavoriteCities";
import Cities from "./Cities";
import useCurrentCity from "../../hooks/city/useCurrentCity";

export default function Home() {
  useCurrentCity();

  return (
    <div className="w-[95%] m-auto">
      <FavoriteCities />
      <Cities />
    </div>
  );
}
