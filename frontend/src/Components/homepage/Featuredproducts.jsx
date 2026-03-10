import React from "react";
import { GoArrowRight } from "react-icons/go";
import { CiShoppingCart } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { useEffect } from "react";
import api from "../../api";
import { useState } from "react";
const Featuredproducts = () => {
  const [featureproduct, setfeatureproduct] = useState([]);
  useEffect(() => {
    const fetchfeatureproducts = async () => {
      const res = await api.get("/products?featured=true");
      setfeatureproduct(res.data.products);
      console.log(featureproduct);
    };
    fetchfeatureproducts();
  }, []);
  return (
    <div className="min-h-screen h-[90] mb-28 md:min-h-fit  md:px-28 min-w-screen flex flex-col gap-7 px-4">
      {" "}
      <div className="flex justify-between">
        <h1 className="text-2xl font-bold">Featured Products</h1>
        <h3 className="flex items-center justify-center gap-1 text-sm text-indigo-600">
          View all
          <GoArrowRight />
        </h3>
      </div>
      <div className="grid grid-cols-1  md:grid-cols-4 md:flex-wrap  gap-6">
        {featureproduct.map((product, idx) => {
          return (
            <div
              key={idx}
              className="flex flex-col  rounded-xl h-[65vh] bg-white"
            >
              <div className="overflow-hidden rounded-t-xl h-[96vh] md:h-4/6 ">
                <img
                  className=" hover:scale-105 h-full object-cover transition-all duration-300 rounded-t-xl"
                  src={product.image}
                  alt=""
                />
              </div>
              <div className="p-3 flex flex-col gap-1">
                <h3 className="text-sm text-gray-500">{product.category}</h3>
                <h1 className="text-sm font-semibold">{product.title}</h1>
                <h1 className="flex items-center gap-0.5">
                  4.4 <FaStar className="text-yellow-500" />
                </h1>
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold">${product.price}</span>
                  <span>
                    <CiShoppingCart className="text-2xl" />
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Featuredproducts;
