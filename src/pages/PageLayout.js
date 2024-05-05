import React from "react";
import { Outlet } from "react-router-dom";
import { Navbar, Sidebar, Footer } from "../components";

const PageLayout = () => {
  return (
    <div>
      <Navbar />
      <Sidebar />
      <Outlet />
      <Footer />
    </div>
  );
};

export default PageLayout;
