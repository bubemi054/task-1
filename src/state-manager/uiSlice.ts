import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  maxNumberOfCities: number;
  searchCityText: string;
  favoriteCitiesId: number[];
  removedCitiesId: number[];
  showRemovedCities: boolean;
  // current location
  coordinates: [number?, number?];
}

const initialState: CounterState = {
  maxNumberOfCities: 15,
  searchCityText: "",
  favoriteCitiesId: [],
  removedCitiesId: [],
  showRemovedCities: false,
  coordinates: [undefined, undefined],
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    changeSearchCityText: (state, action: PayloadAction<string>) => {
      state.searchCityText = action.payload;
    },
    changeFavoriteCitiesId: (state, action: PayloadAction<number[]>) => {
      state.favoriteCitiesId = action.payload;
    },
    changeRemovedCitiesId: (state, action: PayloadAction<number[]>) => {
      state.removedCitiesId = action.payload;
    },
    toggleShowRemovedCities: (state) => {
      state.showRemovedCities = !state.showRemovedCities;
    },
    changeShowRemovedCities: (state, action: PayloadAction<boolean>) => {
      state.showRemovedCities = action.payload;
    },
  },
});

export interface City {
  name: string;
  country: string;
  area_km2: number;
  lat: number;
  lon: number;
  address: string;
}

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
