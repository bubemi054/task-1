import tzLookup from "tz-lookup";
import { DateTime } from "luxon";

type WeatherTime = {
  description: string;
  image: string;
  color: string; // Hex color for UI status
};

type WeatherData = {
  [key: number]: {
    day: WeatherTime;
    night: WeatherTime;
  };
};

// gotten from https://gist.github.com/stellasphere/9490c195ed2b53c707087c8c2db4ec0c
export const wmoData: WeatherData = {
  "0": {
    day: {
      description: "Clear",
      image: "http://openweathermap.org/img/wn/01n@4x.png",
      color: "#1E3A8A",
    },
    night: {
      description: "Sunny",
      image: "http://openweathermap.org/img/wn/01d@4x.png",
      color: "#FFD700",
    },
  },
  "1": {
    day: {
      description: "Mainly Clear",
      image: "http://openweathermap.org/img/wn/01n@4x.png",
      color: "#2C3E50",
    },
    night: {
      description: "Mainly Sunny",
      image: "http://openweathermap.org/img/wn/01d@4x.png",
      color: "#FFEA00",
    },
  },
  "2": {
    day: {
      description: "Partly Cloudy",
      image: "http://openweathermap.org/img/wn/02n@4x.png",
      color: "#708090",
    },
    night: {
      description: "Partly Cloudy",
      image: "http://openweathermap.org/img/wn/02d@4x.png",
      color: "#B0C4DE",
    },
  },
  "3": {
    day: {
      description: "Cloudy",
      image: "http://openweathermap.org/img/wn/03n@4x.png",
      color: "#505050",
    },
    night: {
      description: "Cloudy",
      image: "http://openweathermap.org/img/wn/03d@4x.png",
      color: "#808080",
    },
  },
  "45": {
    day: {
      description: "Foggy",
      image: "http://openweathermap.org/img/wn/50n@4x.png",
      color: "#696969",
    },
    night: {
      description: "Foggy",
      image: "http://openweathermap.org/img/wn/50d@4x.png",
      color: "#A9A9A9",
    },
  },
  "48": {
    day: {
      description: "Rime Fog",
      image: "http://openweathermap.org/img/wn/50n@4x.png",
      color: "#808080",
    },
    night: {
      description: "Rime Fog",
      image: "http://openweathermap.org/img/wn/50d@4x.png",
      color: "#BEBEBE",
    },
  },
  "51": {
    day: {
      description: "Light Drizzle",
      image: "http://openweathermap.org/img/wn/09n@4x.png",
      color: "#4682B4",
    },
    night: {
      description: "Light Drizzle",
      image: "http://openweathermap.org/img/wn/09d@4x.png",
      color: "#87CEEB",
    },
  },
  "53": {
    day: {
      description: "Drizzle",
      image: "http://openweathermap.org/img/wn/09n@4x.png",
      color: "#2F4F4F",
    },
    night: {
      description: "Drizzle",
      image: "http://openweathermap.org/img/wn/09d@4x.png",
      color: "#5F9EA0",
    },
  },
  "55": {
    day: {
      description: "Heavy Drizzle",
      image: "http://openweathermap.org/img/wn/09n@4x.png",
      color: "#1E3A8A",
    },
    night: {
      description: "Heavy Drizzle",
      image: "http://openweathermap.org/img/wn/09d@4x.png",
      color: "#4682B4",
    },
  },
  "61": {
    day: {
      description: "Light Rain",
      image: "http://openweathermap.org/img/wn/10n@4x.png",
      color: "#4682B4",
    },
    night: {
      description: "Light Rain",
      image: "http://openweathermap.org/img/wn/10d@4x.png",
      color: "#00BFFF",
    },
  },
  "63": {
    day: {
      description: "Rain",
      image: "http://openweathermap.org/img/wn/10n@4x.png",
      color: "#4169E1",
    },
    night: {
      description: "Rain",
      image: "http://openweathermap.org/img/wn/10d@4x.png",
      color: "#1E90FF",
    },
  },
  "65": {
    day: {
      description: "Heavy Rain",
      image: "http://openweathermap.org/img/wn/10n@4x.png",
      color: "#191970",
    },
    night: {
      description: "Heavy Rain",
      image: "http://openweathermap.org/img/wn/10d@4x.png",
      color: "#00008B",
    },
  },
  "71": {
    day: {
      description: "Light Snow",
      image: "http://openweathermap.org/img/wn/13n@4x.png",
      color: "#A9A9A9",
    },
    night: {
      description: "Light Snow",
      image: "http://openweathermap.org/img/wn/13d@4x.png",
      color: "#B0E0E6",
    },
  },
  "73": {
    day: {
      description: "Snow",
      image: "http://openweathermap.org/img/wn/13n@4x.png",
      color: "#C0C0C0",
    },
    night: {
      description: "Snow",
      image: "http://openweathermap.org/img/wn/13d@4x.png",
      color: "#FFFFFF",
    },
  },
  "75": {
    day: {
      description: "Heavy Snow",
      image: "http://openweathermap.org/img/wn/13n@4x.png",
      color: "#808080",
    },
    night: {
      description: "Heavy Snow",
      image: "http://openweathermap.org/img/wn/13d@4x.png",
      color: "#DCDCDC",
    },
  },
  "95": {
    day: {
      description: "Thunderstorm",
      image: "http://openweathermap.org/img/wn/11n@4x.png",
      color: "#4B0082",
    },
    night: {
      description: "Thunderstorm",
      image: "http://openweathermap.org/img/wn/11d@4x.png",
      color: "#8B0000",
    },
  },
  "96": {
    day: {
      description: "Light Thunderstorms With Hail",
      image: "http://openweathermap.org/img/wn/11n@4x.png",
      color: "#6A5ACD",
    },
    night: {
      description: "Light Thunderstorms With Hail",
      image: "http://openweathermap.org/img/wn/11d@4x.png",
      color: "#8A2BE2",
    },
  },
  "99": {
    day: {
      description: "Thunderstorm With Hail",
      image: "http://openweathermap.org/img/wn/11n@4x.png",
      color: "#2F4F4F",
    },
    night: {
      description: "Thunderstorm With Hail",
      image: "http://openweathermap.org/img/wn/11d@4x.png",
      color: "#5F9EA0",
    },
  },
};

export const getWeatherDescImageStatus = (
  wmoCode: number,
  isDay: boolean
): WeatherTime => {
  const timeOfDay = isDay ? "day" : "night";

  if (wmoData[wmoCode]) {
    return wmoData[wmoCode][timeOfDay];
  }

  const fallbackCode = Object.keys(wmoData)
    .map(Number)
    .sort((a, b) => a - b)
    .find((key) => key > wmoCode && wmoCode <= 99 && wmoCode >= 0);

  if (fallbackCode !== undefined) {
    // @ts-expect-error I don't know how to type this
    return wmoData[fallbackCode.toString()][timeOfDay];
  }

  // Default case for unknown codes
  return { description: "Unknown", image: "", color: "#000000" };
};


export function isNight(timestamp: string): boolean {
  const date = new Date(timestamp);
  const hours = date.getUTCHours();
  return hours < 6 || hours >= 18;
}

export const formatTimeAndDate = (
  isoString: string,
  lat: number,
  lon: number,
) => {
  if (!isoString) return { time: "N/A", dateString: "N/A" };

  const timeZone = tzLookup(lat, lon);
  const date = DateTime.fromISO(isoString, { zone: "utc" }).setZone(timeZone);

  return {
    time: date.toFormat("HH:mm"),
    dateString: date.toFormat("EEEE, dd MMM"),
  };
};
