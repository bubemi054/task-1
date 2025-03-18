import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CounterState {
  maxNumberOfCities: number;
  searchCityText: string;
  favoriteCitiesIds: string[];
  removedCitiesIds: string[];
  showRemovedCities: boolean;
}

const initialState: CounterState = {
  maxNumberOfCities: 15,
  searchCityText: "",
  favoriteCitiesIds: [],
  removedCitiesIds: [],
  showRemovedCities: false,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    changeSearchCityText: (state, action: PayloadAction<string>) => {
      state.searchCityText = action.payload;
    },
    changeFavoriteCitiesIds: (state, action: PayloadAction<string[]>) => {
      state.favoriteCitiesIds = action.payload;
    },
    changeRemovedCitiesIds: (state, action: PayloadAction<string[]>) => {
      state.removedCitiesIds = action.payload;
    },
    toggleShowRemovedCities: (state) => {
      state.showRemovedCities = !state.showRemovedCities;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
