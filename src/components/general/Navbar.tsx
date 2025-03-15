import Header1 from "../headers/Header1";
import { MdDarkMode } from "react-icons/md";
import { IoSunny } from "react-icons/io5";
import useColorScheme from "../../hooks/ui/useColorScheme";

export default function Navbar() {
  const isDarkMode = useColorScheme();

  return (
    <nav className="flex justify-center items-center mb-[3rem] bg-gray-50 dark:bg-gray-800">
      <Header1>World Wide Weather App</Header1>
      {isDarkMode ? (
        <MdDarkMode className="text-words dark:text-words-dark text-[28px] cursor-pointer" />
      ) : (
        <IoSunny className="text-words dark:text-words-dark text-[28px] cursor-pointer" />
      )}
    </nav>
  );
}
