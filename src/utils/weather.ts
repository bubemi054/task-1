import tzLookup from "tz-lookup";
import { DateTime } from "luxon";

type WeatherTime = {
  description: string;
  image: string;
  color: string;
  emoji: string;
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
      emoji: "☀️",
    },
    night: {
      description: "Sunny",
      image: "http://openweathermap.org/img/wn/01d@4x.png",
      color: "#FFD700",
      emoji: "☀️",
    },
  },
  "1": {
    day: {
      description: "Mainly Clear",
      image: "http://openweathermap.org/img/wn/01n@4x.png",
      color: "#2C3E50",
      emoji: "🌤",
    },
    night: {
      description: "Mainly Sunny",
      image: "http://openweathermap.org/img/wn/01d@4x.png",
      color: "#FFEA00",
      emoji: "🌤",
    },
  },
  "2": {
    day: {
      description: "Partly Cloudy",
      image: "http://openweathermap.org/img/wn/02n@4x.png",
      color: "#708090",
      emoji: "🌤",
    },
    night: {
      description: "Partly Cloudy",
      image: "http://openweathermap.org/img/wn/02d@4x.png",
      color: "#B0C4DE",
      emoji: "🌤",
    },
  },
  "3": {
    day: {
      description: "Cloudy",
      image: "http://openweathermap.org/img/wn/03n@4x.png",
      color: "#505050",
      emoji: "☁️",
    },
    night: {
      description: "Cloudy",
      image: "http://openweathermap.org/img/wn/03d@4x.png",
      color: "#808080",
      emoji: "☁️",
    },
  },
  "45": {
    day: {
      description: "Foggy",
      image: "http://openweathermap.org/img/wn/50n@4x.png",
      color: "#696969",
      emoji: "🌫",
    },
    night: {
      description: "Foggy",
      image: "http://openweathermap.org/img/wn/50d@4x.png",
      color: "#A9A9A9",
      emoji: "🌫",
    },
  },
  "48": {
    day: {
      description: "Rime Fog",
      image: "http://openweathermap.org/img/wn/50n@4x.png",
      color: "#808080",
      emoji: "🌫",
    },
    night: {
      description: "Rime Fog",
      image: "http://openweathermap.org/img/wn/50d@4x.png",
      color: "#BEBEBE",
      emoji: "🌫",
    },
  },
  "51": {
    day: {
      description: "Light Drizzle",
      image: "http://openweathermap.org/img/wn/09n@4x.png",
      color: "#4682B4",
      emoji: "🌧",
    },
    night: {
      description: "Light Drizzle",
      image: "http://openweathermap.org/img/wn/09d@4x.png",
      color: "#87CEEB",
      emoji: "🌧",
    },
  },
  "61": {
    day: {
      description: "Light Rain",
      image: "http://openweathermap.org/img/wn/10n@4x.png",
      color: "#4682B4",
      emoji: "🌧",
    },
    night: {
      description: "Light Rain",
      image: "http://openweathermap.org/img/wn/10d@4x.png",
      color: "#00BFFF",
      emoji: "🌧",
    },
  },
  "71": {
    day: {
      description: "Light Snow",
      image: "http://openweathermap.org/img/wn/13n@4x.png",
      color: "#A9A9A9",
      emoji: "❄️",
    },
    night: {
      description: "Light Snow",
      image: "http://openweathermap.org/img/wn/13d@4x.png",
      color: "#B0E0E6",
      emoji: "❄️",
    },
  },
  "95": {
    day: {
      description: "Thunderstorm",
      image: "http://openweathermap.org/img/wn/11n@4x.png",
      color: "#4B0082",
      emoji: "⛈",
    },
    night: {
      description: "Thunderstorm",
      image: "http://openweathermap.org/img/wn/11d@4x.png",
      color: "#8B0000",
      emoji: "⛈",
    },
  },
};

export const getWeatherDetails = (
  wmoCode: number,
  isDay: boolean,
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
  return { description: "Unknown", image: "", color: "#000000", emoji: "" };
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
