import React from "react";
import { Link } from "react-router";
import { IoIosArrowRoundForward } from "react-icons/io";

const Hero = () => {
  return (
    <div className="min-h-screen min-w-screen md:items-center md:max-w-screen md:min-w-full  md:min-h-[70vh]  px-4 md:px-20  flex flex-col md:flex-row justify-around bg-white py-10 ">
      <div className="flex flex-col mt-4 md:pr-25 md:gap-5 md:h-full md:mt-0 md:w-1/2 md:items-start items-center justify-between  md:justify-center gap-3 ">
        <h3 className=" bg-indigo-100  rounded-2xl px-2.5 py-0.5 w-fit text-sm text-indigo-500">
          🚀New Season Arrivals
        </h3>
        <h1 className="text-4xl md:text-start py-5 md:py-0  md:flex md:flex-col text-center md:text-6xl font-bold">
          Discover Premium{" "}
          <span className="text-indigo-600">Products Online</span>
        </h1>
        <p className="text-center md:text-xl md:text-semibold text-gray-600 md:text-start">
          Shop from thousands of verified vendors. Quality products, fast
          delivery, and secure payments.Shop Now
        </p>
        <div className="flex gap-3">
          <Link>
            <button className="bg-indigo-600 py-2.5 flex items-center justify-center text-white font-semibold px-6 rounded-xl">
              Shop Now
              <IoIosArrowRoundForward className="font-semibold pt-1 text-2xl" />
            </button>
          </Link>
          <Link>
            <button className="bg-gray-200 py-2.5 border border-gray-100 hover:bg-indigo-400 text-black font-semibold px-8 rounded-xl">
              Become a Vendor
            </button>
          </Link>
        </div>
      </div>
      <div className="h-3/5">
        <img
          className="rounded-2xl md:h-80"
          src="https://res.cloudinary.com/dwgrcxx4o/image/upload/v1772901760/hero-banner-sbBafxHj_1_hl4yay.jpg"
          alt="hero-banner"
        />
      </div>
    </div>
  );
};

export default Hero;
