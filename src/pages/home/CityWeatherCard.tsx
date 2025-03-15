import { FaStar } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { WeatherResponse } from "../../state-manager/citySlice";

export default function CityWeatherCard({ name, address, current_units, current }: WeatherResponse) {
  return (
    <div className="w-full max-w-sm bg-gray-50 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <a href="#">
        <img
          className="p-8 rounded-t-lg w-full"
          src="https://flowbite.com/docs/images/products/apple-watch.png"
          alt="product image"
        />
      </a>
      <div className="px-5">
        <a href="#">
          <div className="flex justify-start items-center gap-x-1">
            <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-words-dark">
              {name}
            </h5>
          </div>
          <h5 className="text-base font-semibold tracking-tight text-gray-900 dark:text-words-dark">
            {address}
          </h5>
        </a>
        <div className="flex items-center justify-between mt-2.5 mb-5">
          <div className="flex gap-x-1 items-center">
            <img
              className="w-5 h-5 rounded-full"
              src="https://assets.weatherstack.com/images/wsymbols01_png_64/wsymbol_0001_sunny.png"
              alt="product image"
            />
            <span className="text-3xl font-bold text-gray-900 dark:text-words-dark">
              {current.temperature_2m}{current_units.temperature_2m}
            </span>
          </div>
          <div className="flex gap-x-1 items-center">
            <button className="text-[#ffd900] border bg-gray-200 font-medium rounded-lg text-xl p-2 text-center">
              <FaStar className="t"/>
            </button>
            <button className="text-[#FF0000] border bg-gray-200 font-medium rounded-lg text-xl p-2 text-center">
              <MdDelete className="t"/>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
