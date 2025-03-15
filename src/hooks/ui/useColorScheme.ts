import { useState, useEffect } from "react";

function useColorScheme() {
  const getCurrentTheme = () =>
    window.matchMedia("(prefers-color-scheme: dark)").matches;

  const [isDarkMode, setIsDarkMode] = useState(getCurrentTheme);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

    const handleChange = (e: MediaQueryListEvent) => {
      setIsDarkMode(e.matches);
    };

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  return isDarkMode;
}

export default useColorScheme;
