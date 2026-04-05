import React, { useState } from "react";
import { GoArrowRight } from "react-icons/go";
import { IoTvOutline } from "react-icons/io5";
import { IoShirtOutline } from "react-icons/io5";
import { IoHomeOutline } from "react-icons/io5";
import { LiaDumbbellSolid } from "react-icons/lia";

import { HiOutlineBookOpen } from "react-icons/hi2";

import { IoWatchOutline } from "react-icons/io5";

import api from "../../api";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const BrowseCategories = () => {
  const [electronics, setelectronics] = useState(0);
  const [clothing, setclothing] = useState(0);
  const [homegarden, sethomegarden] = useState(0);
  const [sports, setsports] = useState(0);
  const [Books, setBooks] = useState(0);
  const [accessories, setaccessories] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchcategories = async () => {
      try {
        const res = await api.get("/categories");
        console.log(res.data);

        res.data.categories.forEach((item) => {
          switch (item._id) {
            case "electronics":
              setelectronics(item.totalproducts);
              break;
            case "clothing":
              setclothing(item.totalproducts);
              break;
            case "Home & Garden":
              sethomegarden(item.totalproducts);
              break;
            case "sports":
              setsports(item.totalproducts);
              break;
            case "Books":
              setBooks(item.totalproducts);
              break;
            case "accessories":
              setaccessories(item.totalproducts);
              break;
            default:
          }
        });
      } catch (err) {
        console.log("Error in browse categories:", err);
      }
    };
    fetchcategories();
  }, []);

  const cards = [
    {
      logo: IoTvOutline,
      catename: "Electronics",
      value: "electronics",
      totalproducts: electronics,
    },
    {
      logo: IoShirtOutline,
      catename: "Clothing",
      value: "clothing",
      totalproducts: clothing,
    },
    {
      logo: IoHomeOutline,
      catename: "Home & Garden",
      value: "Home & Garden",
      totalproducts: homegarden,
    },
    {
      logo: LiaDumbbellSolid,
      catename: "Sports",
      value: "sports",
      totalproducts: sports,
    },
    {
      logo: HiOutlineBookOpen,
      catename: "Books",
      value: "Books",
      totalproducts: Books,
    },
    {
      logo: IoWatchOutline,
      catename: "Accessories",
      value: "accessories",
      totalproducts: accessories,
    },
  ];
  return (
    <section className="w-full px-4 md:px-10 lg:px-16">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 rounded-3xl border border-slate-200 bg-white p-5 md:p-7">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-900">
            Browse Categories
          </h1>
          <h3
            onClick={() => navigate("/products")}
            className="flex cursor-pointer items-center justify-center gap-1 text-sm font-semibold text-blue-500"
          >
            View All
            <GoArrowRight />
          </h3>
        </div>
        <div className="w-full grid grid-cols-2 md:grid-rows-1 md:grid-cols-6 gap-3 md:gap-4">
          {cards.map((card, idx) => {
            const Icon = card.logo;
            return (
              <div
                key={idx}
                onClick={() =>
                  navigate(
                    `/products?category=${encodeURIComponent(card.value)}`,
                  )
                }
                className="group flex cursor-pointer flex-col items-center justify-center gap-3 rounded-2xl border border-slate-200 bg-[#F8FAFC] py-5 transition hover:-translate-y-1 hover:shadow-md"
              >
                <div>
                  <div className="w-fit rounded-xl bg-slate-900 p-2.5 transition group-hover:bg-blue-500">
                    <Icon className="text-3xl text-white font-semibold" />
                  </div>
                </div>
                <div className="flex flex-col justify-center items-center">
                  <h1 className="font-semibold text-slate-900">
                    {card.catename}
                  </h1>
                  <p className="text-sm text-slate-500">
                    {card.totalproducts} products
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default BrowseCategories;
