import React from "react";
import Topbar from "../home/topbar";
import Header from "../home/header";
import Navigation from "../home/navigation";


function Layout({ children }) {
  return (
    <>
      <div>
        <Topbar />
        <Header />
        <Navigation />
        {children}
      </div>
    </>
  );
}

export default Layout;
