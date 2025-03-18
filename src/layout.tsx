import { Outlet } from "react-router";
import Cloud from "./pages/home/Cloud";
import SearchBar from "./pages/home/SearchBar";

const Layout = () => {
  return (
    <>
      <Cloud />
      <div className="container max-w-[98%] min-h-[100vh] my-[17px] mx-auto rounded-[20px] backdrop-blur-[20px] bg-[rgba(0,0,0,0.2)] py-[14px] px-[70px] relative z-index-[1]">
        <SearchBar />
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
