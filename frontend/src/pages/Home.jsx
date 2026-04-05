import React from "react";
import Navbar from "../Components/Navbar";
import Hero from "../Components/homepage/Hero";
import Servicecard from "../Components/homepage/Servicecard";
import BrowseCategories from "../Components/homepage/BrowseCategories";
import Featuredproducts from "../Components/homepage/Featuredproducts";
import Footer from "../Components/Footer";

const Home = () => {
  return (
    <div className="relative min-h-screen w-full overflow-x-hidden flex flex-col bg-[#F8FAFC]">
      <div className="pointer-events-none absolute inset-0 z-0">
        <div className="absolute top-0 left-0 h-72 w-72 rounded-full bg-blue-200/40 blur-3xl" />
        <div className="absolute top-20 right-0 h-80 w-80 rounded-full bg-orange-200/40 blur-3xl" />
      </div>
      <Navbar />
      <div className="relative z-10 flex flex-col gap-8 pb-10">
        <Hero />
        <Servicecard />
        <BrowseCategories />
        <Featuredproducts />
      </div>
      <Footer />
    </div>
  );
};

export default Home;

