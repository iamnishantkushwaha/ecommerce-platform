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
const BrowseCategories = () => {
  const [category, setcategory] = useState("");
  const [electronics, setelectronics] = useState(0);
  const [clothing, setclothing] = useState(0);
  const [homegarden, sethomegarden] = useState(0);
  const [sports, setsports] = useState(0);
  const [Books, setBooks] = useState(0);
  const [accessories, setaccessories] = useState(0);
  useEffect(() => {
    const fetchcategories = async () => {
      try {
        const res = await api.get("/categories");
        console.log(res.data);
        setcategory(res.data.categories);

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
      totalproducts: electronics,
    },
    {
      logo: IoShirtOutline,
      catename: "Clothing",
      totalproducts: clothing,
    },
    {
      logo: IoHomeOutline,
      catename: "Home & Garden",
      totalproducts: homegarden,
    },
    {
      logo: LiaDumbbellSolid,
      catename: "Sports",
      totalproducts: sports,
    },
    {
      logo: HiOutlineBookOpen,
      catename: "Books",
      totalproducts: Books,
    },
    {
      logo: IoWatchOutline,
      catename: "Accessories",
      totalproducts: accessories,
    },
  ];
  return (
    <div className="h-auto md:h-full md:py-5 md:px-6 lg:px-10 md:max-w-screen w-full md:min-w-fit flex flex-col gap-10 px-4">
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Browse Categories</h1>
        <h3 className="flex items-center justify-center gap-1 text-sm text-indigo-600">
          View All
          <GoArrowRight />
        </h3>
      </div>
      <div className="w-full grid grid-cols-2 md:grid-rows-1 md:grid-cols-6 gap-4.5">
        {cards.map((card, idx) => {
          const Icon = card.logo;
          return (
            <div
              key={idx}
              className="  flex flex-col  hover:shadow-md justify-center gap-3 items-center rounded-xl py-4 bg-white"
            >
              <div>
                <div className="bg-indigo-100 rounded-xl w-fit p-2">
                  <Icon className="text-3xl text-indigo-600 font-semibold" />
                </div>
              </div>
              <div className="flex flex-col justify-center items-center">
                <h1>{card.catename}</h1>
                <p className="text-gray-400 text-sm">
                  {card.totalproducts} products
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default BrowseCategories;
