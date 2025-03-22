export interface Note {
  id: number;
  cityId?: number;
  text: string;
}

export interface City {
  cityId: number;
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
    coordinates: [number, number];
  };
}

export interface WeatherResponse extends City {
  latitude: number;
  longitude: number;
  generationtime_ms: number;
  utc_offset_seconds: number;
  timezone: string;
  timezone_abbreviation: string;
  elevation: number;

  current_units: {
    time: string;
    interval?: string;
    temperature_2m: string;
    weathercode: string;
    wind_speed_10m: string;
    precipitation: string;
    cloudcover: string;
    relative_humidity_2m: string;
    surface_pressure: string;
    uv_index: string;
  };

  current: {
    time: string;
    interval: number;
    temperature_2m: number;
    weathercode: number;
    wind_speed_10m: number;
    precipitation: number;
    cloudcover: number;
    relative_humidity_2m: number;
    surface_pressure: number;
    uv_index: number;
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

  daily_units: {
    time: string;
    temperature_2m_max: string;
    temperature_2m_min: string;
    weathercode: string;
  };

  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weathercode: number[];
  };
}

export interface PTVLocation {
  locations: {
    referencePosition: {
      latitude: number;
      longitude: number;
    };
    address: {
      countryName: string;
      state: string;
      province: string;
      postalCode: string;
      city: string;
      district: string;
      subdistrict: string;
      street: string;
      houseNumber: string;
      countryCodeIsoAlpha2: string;
      countryCodeIsoAlpha3: string;
      countryCode: string;
    };
    locationType: string;
    quality: {
      distance: number;
    };
    roadAccessPosition: {
      latitude: number;
      longitude: number;
    };
    formattedAddress: string;
    feedbackId: string;
  }[];
  noMatchFeedbackId: string;
}

// export interface WeatherResponse extends City {
//   latitude: number;
//   longitude: number;
//   generationtime_ms: number;
//   utc_offset_seconds: number;
//   timezone: string;
//   timezone_abbreviation: string;
//   elevation: number;
//   current_units: {
//     time: string; // "iso8601"
//     interval: string; // "seconds"
//     temperature_2m: string; // "°C"
//     weathercode: string; // "wmo code"
//     wind_speed_10m: string; // "km/h"
//     precipitation: string; // "mm"
//     cloudcover: string; // "%"
//   };
//   current: {
//     time: string; // ISO 8601 timestamp
//     interval: number; // Interval in seconds
//     temperature_2m: number; // Temperature in °C
//     weathercode: number; // WMO weather code
//     wind_speed_10m: number; // Wind speed in km/h
//     precipitation: number; // Precipitation in mm
//     cloudcover: number; // Cloud cover percentage
//   };
//   hourly_units: {
//     time: string;
//     wind_speed_10m: string;
//     temperature_2m: string;
//     relative_humidity_2m: string;
//     weathercode: string;
//     precipitation: string;
//     cloudcover: string;
//   };
//   hourly: {
//     time: string[];
//     wind_speed_10m: number[];
//     temperature_2m: number[];
//     relative_humidity_2m: number[];
//     weathercode: number[];
//     precipitation: number[];
//     cloudcover: number[];
//   };
// }
