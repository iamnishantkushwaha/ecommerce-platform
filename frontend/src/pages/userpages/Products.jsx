import React, { useEffect } from "react";
import Navbar from "../../Components/Navbar";
import { IoMdSearch } from "react-icons/io";
import { FaFilter } from "react-icons/fa";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";

import FilterDropdown from "../../ui/FilterDropdown";
import api from "../../api";
import Card from "../../ui/Card";

const CATEGORY_OPTIONS = [
  { label: "Electronics", value: "electronics" },
  { label: "Clothing", value: "clothing" },
  { label: "Home & Garden", value: "Home & Garden" },
  { label: "Sports", value: "sports" },
  { label: "Books", value: "Books" },
  { label: "Accessories", value: "accessories" },
];

const parseCategoriesFromQuery = (categoryParam) => {
  if (!categoryParam) return [];

  const values = categoryParam
    .split(",")
    .map((item) => item.trim())
    .filter(Boolean)
    .map((item) => {
      const matched = CATEGORY_OPTIONS.find(
        (category) =>
          category.value.toLowerCase() === item.toLowerCase() ||
          category.label.toLowerCase() === item.toLowerCase(),
      );

      return matched ? matched.value : null;
    })
    .filter(Boolean);

  return [...new Set(values)];
};

const Products = () => {
  const [searchParams] = useSearchParams();
  const [selectedcategories, setselectedcategories] = useState(() =>
    parseCategoriesFromQuery(searchParams.get("category")),
  );
  const [products, setproducts] = useState([]);
  const [openfilter, setopenfilter] = useState(false);
  const [Minprice, setMinprice] = useState();
  const [Maxprice, setMaxprice] = useState();
  const [search, setsearch] = useState("");
  const [sort, setsort] = useState();
  const filterdropdown = [
    { label: "Newest", value: "newest" },
    { label: "Price: Low to High", value: "price_asc" },
    { label: "Price: High to Low", value: "price_desc" },
  ];

  useEffect(() => {
    setselectedcategories(
      parseCategoriesFromQuery(searchParams.get("category")),
    );
  }, [searchParams]);

  useEffect(() => {
    const fetchproducts = async () => {
      try {
        let params = new URLSearchParams();

        if (selectedcategories.length > 0) {
          params.append("category", selectedcategories.join(","));
        }
        if (sort) {
          params.append("sort", sort);
        }
        if (search) {
          params.append("search", search);
        }
        if (Minprice) {
          params.append("minprice", Minprice);
        }
        if (Maxprice) {
          params.append("maxprice", Maxprice);
        }

        const res = await api.get(`/products?${params.toString()}`);

        setproducts(res.data.products);
      } catch (err) {
        console.log("Error in Products", err);
      }
    };
    fetchproducts();
  }, [selectedcategories, Minprice, Maxprice, sort, search]);

  const handlecategorychange = (categoryValue) => {
    setselectedcategories((prev) =>
      prev.includes(categoryValue)
        ? prev.filter((item) => item != categoryValue)
        : [...prev, categoryValue],
    );
  };
  return (
    <>
      <Navbar />{" "}
      <div className="relative w-screen md:w-full min-h-screen px-4 pt-25 md:px-8 lg:px-10 bg-slate-50">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:gap-6">
          {/* for mobile */}
          {openfilter && (
            <div className="flex rounded-2xl flex-col gap-3 border border-slate-200 bg-white p-4 shadow-sm">
              <h2 className="text-2xl font-bold text-slate-900">Filters</h2>
              <h3 className="text-xl font-semibold text-slate-700">Category</h3>
              {CATEGORY_OPTIONS.map((category, idx) => {
                return (
                  <div className="flex flex-col gap-2" key={idx}>
                    <label
                      key={idx}
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        checked={selectedcategories.includes(category.value)}
                        onChange={() => handlecategorychange(category.value)}
                        className="h-4 w-4 rounded-full accent-blue-500"
                      />
                      <span className="text-slate-600">{category.label}</span>
                    </label>
                  </div>
                );
              })}

              <div className="flex flex-col gap-2.5">
                <h3 className="text-xl font-semibold text-slate-700">
                  Price Range
                </h3>
                <div className="flex gap-4  ">
                  <input
                    placeholder="Min"
                    onChange={(e) => setMinprice(e.target.value)}
                    className="h-fit w-30 rounded-xl border border-slate-200 p-2 outline-0"
                    type="text"
                    name="minprice"
                    id="minprice"
                  />
                  -
                  <input
                    type="text"
                    className="h-fit w-30 rounded-e-xl border border-slate-200 p-2 outline-0"
                    placeholder="Max"
                    onChange={(e) => setMaxprice(e.target.value)}
                    name="maxprice"
                    id="manprice"
                  />
                </div>
              </div>
            </div>
          )}

          {/* for Desktop */}

          <div className="hidden md:flex rounded-2xl border border-slate-200 bg-white p-5 md:h-1/2 flex-col gap-3 shadow-sm">
            <h2 className="text-2xl font-bold text-slate-900">Filters</h2>
            <h3 className="text-xl font-semibold text-slate-700">Category</h3>
            {CATEGORY_OPTIONS.map((category, idx) => {
              return (
                <div className="flex flex-col gap-2" key={idx}>
                  <label
                    key={idx}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={selectedcategories.includes(category.value)}
                      onChange={() => handlecategorychange(category.value)}
                      className="h-4 w-4 rounded-full accent-blue-500"
                    />
                    <span className="text-slate-600">{category.label}</span>
                  </label>
                </div>
              );
            })}

            <div className="flex flex-col gap-2.5">
              <h3 className="text-xl font-semibold text-slate-700">
                Price Range
              </h3>
              <div className="flex gap-4  ">
                <input
                  placeholder="Min"
                  className="h-fit w-30 rounded-xl border border-slate-200 p-2 outline-0"
                  type="text"
                  onChange={(e) => setMinprice(e.target.value)}
                  name="minprice"
                  id="minprice"
                />
                -
                <input
                  type="text"
                  className="h-fit w-30 rounded-e-xl border border-slate-200 p-2 outline-0"
                  placeholder="Max"
                  onChange={(e) => setMaxprice(e.target.value)}
                  name="maxprice"
                  id="manprice"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-6 md:w-full">
            <div className="flex flex-col gap-3 md:flex-row">
              <div className="relative w-full">
                <IoMdSearch className="absolute top-1/2 left-3 -translate-y-1/2 text-xl text-slate-400" />
                <input
                  className="w-full rounded-xl border border-slate-200 bg-white p-2 pl-10 outline-0 md:h-10"
                  type="text"
                  value={search}
                  onChange={(e) => setsearch(e.target.value)}
                  name="search"
                  id="search"
                  placeholder="Search for product"
                />
              </div>
              <div className="flex  gap-5">
                {
                  <div className="flex h-fit w-fit rounded-lg border border-slate-300 bg-white p-3 md:hidden">
                    <FaFilter onClick={() => setopenfilter(!openfilter)} />
                  </div>
                }
                <FilterDropdown
                  onChange={(value) => setsort(value)}
                  options={filterdropdown}
                />
              </div>
            </div>
            {products.length === 0 ? (
              <div className="flex min-h-[52vh] w-full items-center justify-center pb-10 text-center font-semibold text-slate-600">
                No Products Available
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 pb-10 md:grid-cols-3">
                {products.map((product, idx) => {
                  return <Card key={idx} product={product} />;
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
