import { City } from "../state-manager/types";

export const haversineDistance = (
  coord1: [number, number],
  coord2: [number, number],
) => {
  const toRad = (angle: number) => (angle * Math.PI) / 180;

  const [lon1, lat1] = coord1;
  const [lon2, lat2] = coord2;

  const R = 6371; // Earth's radius in km
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distance in km
};

export const findClosestCity = (
  cities: City[],
  target: [number, number],
): City | null => {
  if (cities.length === 0) return null;

  return cities.reduce((closestCity, city) => {
    const cityCoords = city.loc.coordinates;
    const cityDistance = haversineDistance(cityCoords, target);
    const closestDistance = haversineDistance(
      closestCity.loc.coordinates,
      target,
    );

    return cityDistance < closestDistance ? city : closestCity;
  }, cities[0]);
};
