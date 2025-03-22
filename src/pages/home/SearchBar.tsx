import React from "react";
import SearchDropdownInput from "../../components/inputs/SearchDropdownInput";
import NotificationIcon from "../../components/icons/NotificationIcon";
import ProfileIcon from "../../components/icons/ProfileIcon";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { uiActions } from "../../state-manager/uiSlice";
import { CITIES } from "../../state-manager/citySlice";
import { RootState } from "../../state-manager/store";

export default function SearchBar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { searchCityText } = useSelector((state: RootState) => state.ui);

  const changeCityTextHandler = (city: string) => {
    dispatch(uiActions.changeSearchCityText(city));
  };

  const selectCityHandler = (cityId: number) => {
    changeCityTextHandler("")
    navigate(`/city/${cityId}`);  
  };

  return (
    <nav className="flex items-center justify-between lg:justify-end lg:gap-x-[1.6rem] mb-[3.8rem]">
      <SearchDropdownInput
        value={searchCityText}
        placeholder="Search City"
        onChange={changeCityTextHandler}
        onSelect={selectCityHandler}
        items={CITIES}
        className="max-w-[13rem] lg:max-w-none"
      />
        <NotificationIcon />
        <ProfileIcon />
    </nav>
  );
}
