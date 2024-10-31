import React from "react";
import Topbar from "./topbar";
import Header from "./header";
import Navigation from "./navigation";
import HeroSection from "./hero-section";


function HomePage() {
  return (
    <>
      <div>
        <Topbar />
        <Header />
        <Navigation />
        <HeroSection />
      </div>
    </>
  );
}

export default HomePage;
