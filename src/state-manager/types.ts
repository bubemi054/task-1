export interface City {
  cityId: string;
  name: string;
  country: string;
  altCountry: string;
  muni: string;
  muniSub: string;
  featureClass: string;
  featureCode: string;
  adminCode: string;
  population: number;
  loc: {
    type: "Point";
    coordinates: [number, number]; // Longitude, Latitude
  };
};

export interface WeatherResponse extends City {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;
  current_units: {
    time: string; // "iso8601"
    interval: string; // "seconds"
    temperature_2m: string; // "°C"
    weathercode: string; // "wmo code"
    wind_speed_10m: string; // "km/h"
    precipitation: string; // "mm"
    cloudcover: string; // "%"
  };
  current: {
    time: string; // ISO 8601 timestamp
    interval: number; // Interval in seconds
    temperature_2m: number; // Temperature in °C
    weathercode: number; // WMO weather code
    wind_speed_10m: number; // Wind speed in km/h
    precipitation: number; // Precipitation in mm
    cloudcover: number; // Cloud cover percentage
  };
  hourly_units: {
    time: string;
    wind_speed_10m: string;
    temperature_2m: string;
    relative_humidity_2m: string;
    weathercode: string;
    precipitation: string;
    cloudcover: string;
  };
  hourly: {
    time: string[];
    wind_speed_10m: number[];
    temperature_2m: number[];
    relative_humidity_2m: number[];
    weathercode: number[];
    precipitation: number[];
    cloudcover: number[];
  };
}
