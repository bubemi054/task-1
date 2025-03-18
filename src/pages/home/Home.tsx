import FavoriteCities from "./FavoriteCities";
import Cities from "./Cities";

export default function Home() {
  return (
    <div className="w-[95%] m-auto">
      <FavoriteCities />
      <Cities />
    </div>
  );
}
