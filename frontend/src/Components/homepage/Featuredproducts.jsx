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
    };
    fetchfeatureproducts();
  }, []);
  return (
    <section className="w-full px-4 md:px-10 lg:px-16 pb-10">
      <div className="mx-auto min-h-screen md:min-h-fit max-w-7xl rounded-3xl border border-slate-200 bg-white p-5 md:p-7 flex flex-col gap-7">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-900">
            Featured Products
          </h1>
          <h3 className="flex items-center justify-center gap-1 text-sm font-semibold text-blue-500">
            View all
            <GoArrowRight />
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {featureproduct.map((product, idx) => {
            return <Card key={product._id} idx={idx} product={product} />;
          })}
        </div>
      </div>
    </section>
  );
};

export default Featuredproducts;

