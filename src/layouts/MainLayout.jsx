import { Outlet } from "react-router-dom";
import ScrollTop from "../components/ScrollTop";
import NavBar from "../components/Home/NavBar";
import Footer from "../components/Home/Footer";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">

      <NavBar />

      <ScrollTop />

      <div className="flex-1 pt-[88px]">
        <Outlet />
      </div>

      <Footer />

    </div>
  );
};

export default MainLayout;
