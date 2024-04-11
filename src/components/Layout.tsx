import { Outlet } from "react-router-dom";
import Header from "./Header";

const Layout = () => {
  return (
    <div className="h-full w-full">
      <Header></Header>
      <Outlet />
    </div>
  );
};

export default Layout;
