import React from "react";
import { GoArrowRight } from "react-icons/go";

import { useEffect } from "react";
import api from "../../api";
import { useState } from "react";
import Card from "../../ui/Card";
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
            <Card key={product._id} idx={idx} product={product} />
          );
        })}
      </div>
    </div>
  );
};

export default Featuredproducts;
