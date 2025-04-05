// @ts-expect-error Need React imported for my tests
import React from "react";
import SearchDropdownInput from "../../components/inputs/SearchDropdownInput";
import useShowCurrentCityWeather from "../../hooks/city/useShowCurrentCityWeather";
import { CgProfile } from "react-icons/cg";
import { Home } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { uiActions } from "../../state-manager/uiSlice";
import { CITIES } from "../../state-manager/citySlice";
import { RootState } from "../../state-manager/store";
import { useIsOnline } from "react-use-is-online";
import { City } from "../../state-manager/types";

export default function SearchBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { searchCityText } = useSelector((state: RootState) => state.ui);
  const { isOffline } = useIsOnline();
  const { viewCurrentCityWeather } = useShowCurrentCityWeather();

  const changeCityTextHandler = (city: string) => {
    dispatch(uiActions.changeSearchCityText(city));
  };

  const selectCityHandler = (city: City) => {
    if (isOffline) return;
    changeCityTextHandler("");
    navigate(`/city/${city.cityId}`);
  };

  return (
    <nav className="mb-[3.8rem] flex items-center justify-between gap-x-[0.5rem] gap-y-[1rem] flex-row">
      <Home
        onClick={() => navigate("/")}
        className={`cursor-pointer justify-self-start text-white`}
        size={32}
      />
      <div className="flex items-center justify-between gap-x-[0.5rem] lg:gap-x-[1.6rem]">
        <SearchDropdownInput
          value={searchCityText}
          placeholder="Search City"
          onChange={changeCityTextHandler}
          onSelect={selectCityHandler}
          items={CITIES}
          className="max-w-[13rem] lg:max-w-none"
          isOffline={isOffline}
        />
        <CgProfile
          size={36}
          onClick={viewCurrentCityWeather}
          className={`text-white ${isOffline ? "cursor-not-allowed" : "cursor-pointer"}`}
        />
      </div>
    </nav>
  );
}
