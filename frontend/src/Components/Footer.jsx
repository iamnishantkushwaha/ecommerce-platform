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
    <footer className="w-full px-4 pb-8 pt-10 md:px-10 lg:px-16">
      <div className="mx-auto max-w-7xl rounded-3xl border border-slate-200 bg-white p-6 shadow-[0_20px_45px_-35px_rgba(15,23,42,0.45)] md:p-8">
        <div className="grid gap-8 border-b border-slate-200 pb-8 md:grid-cols-2 lg:grid-cols-[1.25fr_1fr_1fr_1fr_1fr]">
          <div className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <h1 className="flex items-center gap-2 text-2xl font-bold text-slate-900">
                <Link to="/" className="flex items-center gap-2">
                  <span className="rounded-xl bg-slate-900 p-2 text-white">
                    <FiShoppingBag className="text-2xl" />
                  </span>
                  ShopNest
                </Link>
              </h1>
              <p className="max-w-md text-sm leading-relaxed text-slate-500">
                Your one-stop multi-vendor marketplace for quality products from
                trusted sellers worldwide.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-[#F8FAFC] p-4">
              <label
                htmlFor="newsletter"
                className="mb-2 block text-sm font-semibold text-slate-700"
              >
                Subscribe to our newsletter
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2 text-sm outline-0 focus:border-blue-500"
                  placeholder="Enter your email"
                  name="newsletter"
                  id="newsletter"
                />
                <button className="rounded-xl bg-slate-900 p-3 text-white transition hover:bg-blue-500">
                  <FaTelegramPlane className="text-xl" />
                </button>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2 text-sm text-slate-600">
            <h3 className="mb-2 text-base font-semibold text-slate-900">
              <Link to="/products">Shop</Link>
            </h3>
            <h3 className="hover:text-blue-500">
              <Link to="/products">All Products</Link>
            </h3>
            <h3 className="hover:text-blue-500">
              <Link to="/products">Categories</Link>
            </h3>
            <h3 className="hover:text-blue-500">
              <Link to="/products">Deals</Link>
            </h3>
            <h3 className="hover:text-blue-500">
              <Link to="/products">New Arrivals</Link>
            </h3>
          </div>

          <div className="flex flex-col gap-2 text-sm text-slate-600">
            <h3 className="mb-2 text-base font-semibold text-slate-900">
              <Link to="/dashboard">Account</Link>
            </h3>
            <h3 className="hover:text-blue-500">
              <Link to="/dashboard/orders">My Orders</Link>
            </h3>
            <h3 className="hover:text-blue-500">
              <Link to="/cart">Wishlist</Link>
            </h3>
            <h3 className="hover:text-blue-500">
              <Link to="/dashboard/profile">Profile</Link>
            </h3>
            <h3 className="hover:text-blue-500">
              <Link to="/dashboard/setting">Settings</Link>
            </h3>
          </div>

          <div className="flex flex-col gap-2 text-sm text-slate-600">
            <h3 className="mb-2 text-base font-semibold text-slate-900">
              <Link to="/">Company</Link>
            </h3>
            <h3 className="hover:text-blue-500">
              <Link to="/">About Us</Link>
            </h3>
            <h3>Careers</h3>
            <h3>Blogs</h3>
            <h3 className="hover:text-blue-500">
              <Link to="/">Contact</Link>
            </h3>
          </div>

          <div className="flex flex-col gap-2 text-sm text-slate-600">
            <h3 className="mb-2 text-base font-semibold text-slate-900">
              <Link to="/">Support</Link>
            </h3>
            <h3 className="hover:text-blue-500">
              <Link to="/">Help Center</Link>
            </h3>
            <h3>Shipping Info</h3>
            <h3>Returns</h3>
            <h3>Privacy Policy</h3>
          </div>
        </div>

        <div className="mt-5 flex flex-col items-center justify-between gap-4 text-sm text-slate-500 md:flex-row">
          <span>© 2026 ShopNest. All rights reserved.</span>
          <div className="flex gap-2 text-lg text-slate-700">
            <button className="rounded-full border border-slate-200 p-2 transition hover:border-blue-500 hover:text-blue-500">
              <LuFacebook />
            </button>
            <button className="rounded-full border border-slate-200 p-2 transition hover:border-blue-500 hover:text-blue-500">
              <RiTwitterXLine />
            </button>
            <button className="rounded-full border border-slate-200 p-2 transition hover:border-blue-500 hover:text-blue-500">
              <FaInstagram />
            </button>
            <button className="rounded-full border border-slate-200 p-2 transition hover:border-blue-500 hover:text-blue-500">
              <SlSocialYoutube />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
