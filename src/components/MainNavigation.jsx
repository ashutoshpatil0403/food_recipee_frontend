import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

const MainNavigation = () => {
  return (
    <>
      <Navbar></Navbar>
      <Outlet></Outlet>
      <Footer></Footer>
    </>
  );
};

export default MainNavigation;
