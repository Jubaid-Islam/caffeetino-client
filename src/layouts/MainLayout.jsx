import { Outlet } from "react-router-dom";
import ScrollTop from "../components/ScrollTop";
import NavBar from "../components/Home/NavBar";
import Footer from "../components/Home/Footer";
import Loading from "../ui/Loading";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext"

const MainLayout = () => {
  const { loading } = useContext(AuthContext);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />

      <ScrollTop />

      <main className="flex-1 pt-16">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;