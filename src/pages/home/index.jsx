import React from "react";
import Topbar from "./topbar";
import Header from "./header";
import Navigation from "./navigation";
import HeroSection from "./hero-section";
import DealOfTheDay from "./deal-of-the-day";
import Category from "./category";

function HomePage() {
  return (
    <>
      <div>
        <Topbar />
        <Header />
        <Navigation />
        <HeroSection />
        <DealOfTheDay />
        <Category/>
      </div>
    </>
  );
}

export default HomePage;
