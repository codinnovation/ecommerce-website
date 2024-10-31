import React from "react";
import Topbar from "./topbar";
import Header from "./header";
import Navigation from "./navigation";

function HomePage() {
  return (
    <>
      <div>
        <Topbar />
        <Header />
        <Navigation />
      </div>
    </>
  );
}

export default HomePage;
