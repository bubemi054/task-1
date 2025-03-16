import SearchBar from "./SearchBar";
import FavoriteCities from "./FavoriteCities";
import Cities from "./Cities";
import RemovedCities from "./RemovedCities";
import { useSelector } from "react-redux";
import { RootState } from "../../state-manager/store";

export default function Home() {
  const { showRemovedCities } = useSelector((state: RootState) => state.ui);

  return (
    <>
      {showRemovedCities && <RemovedCities />}

      <div className="px-[1.3rem] py-[1.4rem]">
        <div className="container max-w-[95%] mx-auto backdrop-blur-[15px] rounded-[1.25rem] bg-[rgba(255,255,255,0.10)] py-4 px-4">
          <SearchBar />
          <FavoriteCities />
          <Cities />
        </div>
      </div>
    </>
  );
}
