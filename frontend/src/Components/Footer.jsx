import React from "react";
import { FiShoppingBag } from "react-icons/fi";
import { FaTelegramPlane } from "react-icons/fa";
import { SlSocialYoutube } from "react-icons/sl";

import { FaInstagram } from "react-icons/fa";
import { RiTwitterXLine } from "react-icons/ri";
import { LuFacebook } from "react-icons/lu";
import { Link } from "react-router";
const Footer = () => {
  return (
    <div className="min-h-screen md:min-h-fit min-w-screen px-4 md:px-27 bg-white ">
      <div className="flex flex-col md:flex-row gap-12 md:gap-15 py-15 md:py-8 border-b border-gray-100">
        <div className="flex flex-col justify-items-start">
          <div className=" h-40 p-4 md:w-150   gap-1.5 w-full   flex flex-col justify-center items-start">
            <h1 className="  text-indigo-600 gap-2 flex text-2xl font font-bold">
              <FiShoppingBag className="text-3xl" />
              MarketPro
            </h1>
            <p className="text-gray-400 ">
              Your one-stop multi-vendor marketplace for quality products from
              trusted sellers worldwide.
            </p>
          </div>
          <div className="flex flex-col font-semibold gap-1">
            <label htmlFor="newsletter">Subscribe to our newsletter</label>
            <div className="flex gap-3 w-full">
              <input
                type="text"
                className="bg-gray-200 w-5/6 outline-0 rounded-xl px-2"
                placeholder="Enter your email"
                name="newsletter"
                id="newsletter"
              />
              <button className="bg-indigo-600 text-white p-3 rounded-xl">
                <FaTelegramPlane className="text-2xl" />
              </button>
            </div>
          </div>
        </div>

        <div className="text-gray-600 flex flex-col gap-2">
          <h3 className="text-black font-semibold">
            <Link>Shop</Link>
          </h3>
          <h3>
            <Link>All Products</Link>
          </h3>
          <h3>
            <Link>Categories</Link>
          </h3>
          <h3>
            <Link>Deals</Link>
          </h3>
          <h3>
            <Link>New Arrivals</Link>
          </h3>
        </div>

        <div className="text-gray-600 flex flex-col gap-2">
          <h3 className="text-black font-semibold">
            <Link>Account</Link>
          </h3>
          <h3>
            <Link>My Orders</Link>
          </h3>
          <h3>
            <Link>Wishlist</Link>
          </h3>
          <h3>
            <Link>Profile</Link>
          </h3>
          <h3>
            <Link>Settings</Link>
          </h3>
        </div>

        <div className="text-gray-600 flex flex-col gap-2">
          <h3 className="text-black font-semibold">
            <Link>Company</Link>
          </h3>
          <h3>
            <Link>About Us</Link>
          </h3>
          <h3>
            <Link>Careers</Link>
          </h3>
          <h3>
            <Link>Blogs</Link>
          </h3>
          <h3>
            <Link>Contact</Link>
          </h3>
        </div>

        <div className="text-gray-600 flex flex-col gap-2">
          <h3 className="text-black font-semibold">
            <Link>Support</Link>
          </h3>
          <h3>
            <Link>Help Center</Link>
          </h3>
          <h3>
            <Link>Shupping Info</Link>
          </h3>
          <h3>
            <Link>Returns</Link>
          </h3>
          <h3>
            <Link>Privacy Policy</Link>
          </h3>
        </div>
      </div>
      <div className="flex flex-col  md:pb-0 md:text-sm  md:flex-row gap-5 mt-4 md:mt-0  justify-center md:justify-between my-4 items-center">
        <span className="md:my-5">© 2026 MarketPro. All rights reserved.</span>
        <div className=" text-2xl md:my-5 md:text-lg flex gap-2 md:gap-4 md:pr-8">
          <LuFacebook />
          <RiTwitterXLine />
          <FaInstagram />
          <SlSocialYoutube />
        </div>
      </div>
    </div>
  );
};

export default Footer;
