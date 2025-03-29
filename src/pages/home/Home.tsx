// @ts-expect-error Need React imported for my tests
import React from "react";
import FavoriteCities from "./FavoriteCities";
import Cities from "./Cities";

export default function Home() {
  return (
    <div className="">
      <FavoriteCities />
      <Cities />
    </div>
  );
}
