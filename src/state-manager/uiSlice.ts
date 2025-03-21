import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
// import cities from 'all-the-cities';
// eslint-disable-next-line @typescript-eslint/no-require-imports
// const cities = require('all-the-cities');

export interface CounterState {
  maxNumberOfCities: number;
  searchCityText: string;
  favoriteCities: string[];
  removedCities: string[];
  showRemovedCities: boolean;
}

const initialState: CounterState = {
  maxNumberOfCities: 15,
  searchCityText: "",
  favoriteCities: [],
  removedCities: [],
  showRemovedCities: false,
};

export const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    changeSearchCityText: (state, action: PayloadAction<string>) => {
      state.searchCityText = action.payload;
    },
    changeFavoriteCities: (state, action: PayloadAction<string[]>) => {
      state.favoriteCities = action.payload;
    },
    changeRemovedCities: (state, action: PayloadAction<string[]>) => {
      state.removedCities = action.payload;
    },
    toggleShowRemovedCities: (state) => {
      state.showRemovedCities = !state.showRemovedCities;
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

export const BIGGEST_CITIES = [
  {
    name: "Sermersooq",
    country: "Greenland",
    area_km2: 531900,
    lat: 64.1835,
    lon: -51.7216,
    address: "Sermersooq Municipality, Greenland",
  },
  {
    name: "Avannaata",
    country: "Greenland",
    area_km2: 522700,
    lat: 77.4833,
    lon: -69.3333,
    address: "Avannaata Municipality, Greenland",
  },
  {
    name: "Nagqu",
    country: "China",
    area_km2: 450537,
    lat: 31.476,
    lon: 92.058,
    address: "Nagqu, Tibet, China",
  },
  {
    name: "Hulunbuir",
    country: "China",
    area_km2: 263953,
    lat: 49.211,
    lon: 119.746,
    address: "Hulunbuir, Inner Mongolia, China",
  },
  {
    name: "Altamira",
    country: "Brazil",
    area_km2: 159533,
    lat: -3.203,
    lon: -52.206,
    address: "Altamira, Pará, Brazil",
  },
  {
    name: "Jiuquan",
    country: "China",
    area_km2: 167996,
    lat: 39.743,
    lon: 98.517,
    address: "Jiuquan, Gansu, China",
  },
  {
    name: "Shigatse",
    country: "China",
    area_km2: 182000,
    lat: 29.267,
    lon: 88.883,
    address: "Shigatse, Tibet, China",
  },
  {
    name: "Chongqing",
    country: "China",
    area_km2: 82403,
    lat: 29.564,
    lon: 106.551,
    address: "Chongqing, China",
  },
  {
    name: "Sitka",
    country: "United States",
    area_km2: 7415,
    lat: 57.053,
    lon: -135.33,
    address: "Sitka, Alaska, USA",
  },
  {
    name: "Juneau",
    country: "United States",
    area_km2: 8431,
    lat: 58.301,
    lon: -134.42,
    address: "Juneau, Alaska, USA",
  },
  {
    name: "Wrangell",
    country: "United States",
    area_km2: 8990,
    lat: 56.471,
    lon: -132.377,
    address: "Wrangell, Alaska, USA",
  },
  {
    name: "Anchorage",
    country: "United States",
    area_km2: 5070,
    lat: 61.217,
    lon: -149.9,
    address: "Anchorage, Alaska, USA",
  },
  {
    name: "Jacksonville",
    country: "United States",
    area_km2: 2260,
    lat: 30.332,
    lon: -81.655,
    address: "Jacksonville, Florida, USA",
  },
  {
    name: "Anaconda",
    country: "United States",
    area_km2: 1908,
    lat: 46.128,
    lon: -112.948,
    address: "Anaconda, Montana, USA",
  },
  {
    name: "Butte",
    country: "United States",
    area_km2: 1854,
    lat: 46.003,
    lon: -112.533,
    address: "Butte, Montana, USA",
  },
  {
    name: "Houston",
    country: "United States",
    area_km2: 1659,
    lat: 29.76,
    lon: -95.369,
    address: "Houston, Texas, USA",
  },
  {
    name: "Oklahoma City",
    country: "United States",
    area_km2: 1570,
    lat: 35.467,
    lon: -97.516,
    address: "Oklahoma City, Oklahoma, USA",
  },
  {
    name: "Phoenix",
    country: "United States",
    area_km2: 1342,
    lat: 33.448,
    lon: -112.074,
    address: "Phoenix, Arizona, USA",
  },
  {
    name: "Los Angeles",
    country: "United States",
    area_km2: 1302,
    lat: 34.052,
    lon: -118.244,
    address: "Los Angeles, California, USA",
  },
  {
    name: "San Antonio",
    country: "United States",
    area_km2: 1205,
    lat: 29.424,
    lon: -98.494,
    address: "San Antonio, Texas, USA",
  },
];

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
