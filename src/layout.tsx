// @ts-expect-error Need React imported for my tests
import React from "react";
import { Outlet } from "react-router";
import Cloud from "./pages/home/Cloud";
import SearchBar from "./pages/home/SearchBar";
const Layout = () => {
  return (
    <>
      <Cloud />
      <div className="relative z-[1] sm:container mx-4 md:mx-auto my-4 min-h-screen max-w-[95%] rounded-2xl bg-[rgba(0,0,0,0.2)] p-4 backdrop-blur-lg sm:max-w-[98%] sm:p-8 md:p-12 lg:p-16 [@media(max-width:550px)]:max-w-[100%]">
        <SearchBar />
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
