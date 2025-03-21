import tzLookup from "tz-lookup";
import { DateTime } from "luxon";


export function isNight(timestamp: string): boolean {
  const date = new Date(timestamp);
  const hours = date.getUTCHours();
  return hours < 6 || hours >= 18;
}

export function getWeatherStatus(wmoCode: number) {
  if (wmoCode >= 0 && wmoCode <= 29) {
    return { status: "Clear", color: "#FF8E27" };
  }
  if (wmoCode >= 30 && wmoCode <= 59) {
    return { status: "Drizzle", color: "#8EC1DD" };
  }
  if (wmoCode >= 60 && wmoCode <= 69) {
    return { status: "Rain", color: "#27B1FF" };
  }
  if (wmoCode >= 70 && wmoCode <= 79) {
    return { status: "Snow", color: "#4E8DB1" };
  }
  if (wmoCode >= 80 && wmoCode <= 89) {
    return { status: "Showers", color: "#8EC1DD" };
  }
  if (wmoCode >= 90 && wmoCode <= 99) {
    return { status: "Thunderstorm", color: "#BF8EDD" };
  }
  return { status: "Unknown", color: "#9CA3AF" };
}

export const formatTimeAndDate = (isoString: string, lat: number, lon: number) => {
  if (!isoString) return { time: "N/A", dateString: "N/A" };

  const timeZone = tzLookup(lat, lon); // Get timezone based on coordinates
  const date = DateTime.fromISO(isoString, { zone: "utc" }) // Convert to UTC first
    .setZone(timeZone); // Adjust to correct timezone

  return {
    time: date.toFormat("HH:mm"), // 24-hour format
    dateString: date.toFormat("EEEE, dd MMM"), // Weekday, DD MMM
  };
};