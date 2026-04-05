import React from "react";
import { Link } from "react-router";
import { IoIosArrowRoundForward } from "react-icons/io";

const Hero = () => {
  return (
    <section className="w-full px-4 md:px-10 lg:px-16 pt-24">
      <div className="mx-auto grid max-w-7xl items-center gap-8 rounded-3xl border border-slate-200/70 bg-white/85 p-6 shadow-[0_18px_50px_-30px_rgba(15,23,42,0.45)] backdrop-blur md:min-h-[70vh] md:grid-cols-2 md:p-12">
        <div className="flex flex-col gap-5 md:items-start items-center text-center md:text-left">
          <h3 className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-600">
            🚀New Season Arrivals
          </h3>
          <h1 className="py-1 text-4xl font-extrabold tracking-tight text-slate-900 md:flex md:flex-col md:text-6xl">
            Discover Premium{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-slate-900 to-blue-600">
              Products Online
            </span>
          </h1>
          <p className="max-w-xl text-base text-slate-600 md:text-lg">
            Shop from thousands of verified vendors. Quality products, fast
            delivery, and secure payments. Shop now.
          </p>
          <div className="flex w-full flex-col items-stretch gap-3 sm:w-auto sm:flex-row sm:items-center md:gap-4">
            <Link
              to="/products"
              className="inline-flex min-h-12 items-center justify-center gap-1 rounded-xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-800 hover:shadow-lg"
            >
              Shop Now
              <IoIosArrowRoundForward className="text-2xl" />
            </Link>
            <Link
              to="/signup"
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-slate-300 bg-slate-100 px-6 py-3 font-semibold text-slate-900 transition hover:bg-slate-200"
            >
              Become a Vendor
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -right-3 -top-3 h-24 w-24 rounded-full bg-blue-200/70 blur-2xl" />
          <img
            className="relative z-10 w-full rounded-2xl border border-slate-200 object-cover md:h-96"
            src="https://res.cloudinary.com/dwgrcxx4o/image/upload/v1772901760/hero-banner-sbBafxHj_1_hl4yay.jpg"
            alt="hero-banner"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
