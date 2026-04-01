import React from "react";
import Navbar from "../Components/Navbar";
import Hero from "../Components/homepage/Hero";
import Servicecard from "../Components/homepage/Servicecard";
import BrowseCategories from "../Components/homepage/BrowseCategories";
import Featuredproducts from "../Components/homepage/Featuredproducts";
import Footer from "../Components/Footer";

const Home = () => {
  return (
    <div className="min-h-screen w-full mt-20 overflow-x-hidden flex flex-col gap-10 bg-gray-200">
      <Navbar />
      <Hero />
      <Servicecard />
      <BrowseCategories />
      <Featuredproducts />
      <Footer />
    </div>
  );
};

export default Home;
