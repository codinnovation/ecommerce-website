import React from "react";
import Topbar from "./topbar";
import Header from "./header";
import Navigation from "./navigation";
import HeroSection from "./hero-section";
import DealOfTheDay from "./deal-of-the-day";
import Category from "./category";
import { Toaster, toast } from "react-hot-toast";

function HomePage({ user }) {
  return (
    <>
      <div>
        <Topbar user={user} />
        <Header user={user} />
        <Navigation user={user} />
        <HeroSection user={user} />
        <DealOfTheDay user={user} />
        <Category user={user} />
      </div>

      <Toaster />
    </>
  );
}

export default HomePage;
