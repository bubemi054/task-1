import React from "react";
import SearchDropdownInput from "../../components/inputs/SearchDropdownInput";
// import NotificationIcon from "../../components/icons/NotificationIcon";
import ProfileIcon from "../../components/icons/ProfileIcon";
import { Home } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { uiActions } from "../../state-manager/uiSlice";
import { CITIES } from "../../state-manager/citySlice";
import { RootState } from "../../state-manager/store";
import { useIsOnline } from "react-use-is-online";

export default function SearchBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { searchCityText } = useSelector((state: RootState) => state.ui);
  const { isOffline } = useIsOnline();

  const changeCityTextHandler = (city: string) => {
    dispatch(uiActions.changeSearchCityText(city));
  };

  const selectCityHandler = (cityId: number) => {
    if(isOffline) return
    changeCityTextHandler("");
    navigate(`/city/${cityId}`);
  };

  const selectCurrentCityHandler = () => {
    if(isOffline) return
    changeCityTextHandler("");
    navigate(`/city/0?current-location=true`);
  };

  return (
    // <nav className="flex items-center justify-between lg:justify-end lg:gap-x-[1.6rem] mb-[3.8rem]">
    <nav className="flex flex-col sm:flex-row gap-y-[1rem] items-center justify-between gap-x-[0.5rem] mb-[3.8rem]">
      <Home
        onClick={() => navigate("/")}
        className={`text-white justify-self-start cursor-pointer`}
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
        {/* <NotificationIcon /> */}
        <ProfileIcon
          onClick={selectCurrentCityHandler}
          className={`${isOffline ? "cursor-not-allowed" : "cursor-pointer"}`}
        />
      </div>
    </nav>
  );
}
