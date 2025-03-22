import React from "react";
import { Outlet } from "react-router";
import Cloud from "./pages/home/Cloud";
import SearchBar from "./pages/home/SearchBar";
import useCurrentCity from "./hooks/city/useCurrentCity";

const Layout = () => {
  useCurrentCity();

  return (
    <>
      <Cloud />
      <div className="container max-w-[95%] sm:max-w-[98%] min-h-screen my-4 mx-auto rounded-2xl backdrop-blur-lg bg-[rgba(0,0,0,0.2)] p-4 sm:p-8 md:p-12 lg:p-16 relative z-[1]">
        <SearchBar />
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
