import React, { useEffect } from "react";
import Navbar from "../../Components/Navbar";
import { IoMdSearch } from "react-icons/io";
import { FaFilter } from "react-icons/fa";
import { useState } from "react";
import FilterDropdown from "../../ui/FilterDropdown";
import api from "../../api";
import Card from "../../ui/Card"
const Products = () => {
  const categories = [
    "Electronics",
    "Clothing",
    "Home & Garden",
    "Sports",
    "Books",
    "Accessories",
  ];
  const [isDesktop,setisDesktop]=useState(true);
  const [products,setproducts]=useState([])
  const [openfilter,setopenfilter]=useState(false);
  const filterdropdown = ["Newest", "Price:Low to High", "Price:High to Low"];
 useEffect(()=>{
  const fetchproducts=async()=>{
    const res=await api.get("/products")
    console.log(res.data.products);
 setproducts(res.data.products)
  }
  fetchproducts();
 },[])

  return (
    <>
      <Navbar />{" "}
      <div className=" relative min-w-screen min-h-screen md:px-27 flex-col md:flex-row flex gap-3 bg-gray-100 px-4 pt-25">
        {/* for mobile */}
        {openfilter && <div className="flex rounded-xl flex-col gap-3 bg-white p-4">
          <h2 className="text-2xl font-bold">Filters</h2>
          <h3 className="text-xl font-semibold">Category</h3>
          {categories.map((category, idx) => {
            return (
              <div className="flex flex-col gap-2" key={idx}>
                <label
                  key={idx}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded-full accent-indigo-500"
                  />
                  <span className="text-gray-600">{category}</span>
                </label>
              </div>
            );
          })}


          
          <div className="flex flex-col gap-2.5">
            <h3 className="text-xl font-semibold ">Price Range</h3>
            <div className="flex gap-4  ">
              <input
                placeholder="Min"
                className="p-2 rounded-xl w-30 border outline-0 border-gray-100 h-fit  "
                type="text"
                name="minprice"
                id="minprice"
              />
              -
              <input
                type="text"
                className="p-2 border outline-0 border-gray-100  w-30 h-fit rounded-e-xl "
                placeholder="Max"
                name="maxprice"
                id="manprice"
              />
            </div>
          </div>
        </div>}

        {/* for Desktop */}
        
       <div className="md:flex hidden rounded-xl flex-col gap-3 bg-white p-4">
          <h2 className="text-2xl font-bold">Filters</h2>
          <h3 className="text-xl font-semibold">Category</h3>
          {categories.map((category, idx) => {
            return (
              <div className="flex flex-col gap-2" key={idx}>
                <label
                  key={idx}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded-full accent-indigo-500"
                  />
                  <span className="text-gray-600">{category}</span>
                </label>
              </div>
            );
          })}


          
          <div className="flex flex-col gap-2.5">
            <h3 className="text-xl font-semibold ">Price Range</h3>
            <div className="flex gap-4  ">
              <input
                placeholder="Min"
                className="p-2 rounded-xl w-30 border outline-0 border-gray-100 h-fit  "
                type="text"
                name="minprice"
                id="minprice"
              />
              -
              <input
                type="text"
                className="p-2 border outline-0 border-gray-100  w-30 h-fit rounded-e-xl "
                placeholder="Max"
                name="maxprice"
                id="manprice"
              />
            </div>
          </div>
        </div>


        <IoMdSearch className={!openfilter?" md:left-30 absolute top-28 left-8 text-xl text-gray-400":"absolute top-134 left-8 text-xl text-gray-400"}  />
        <input
          className="bg-white outline-0 border pl-8 w-full border-gray-200 p-2  rounded-xl"
          type="text"
          name="search"
          id="search"
          placeholder="  Search for product"
        />
        <div className="flex  gap-5">
          <div className="p-3 rounded-lg border h-fit w-fit border-gray-400">
            <FaFilter onClick={()=>setopenfilter(!openfilter)} />
          </div>
          <FilterDropdown  options={filterdropdown} />
        </div>
        <div className="grid grid-cols-1 gap-5 md:grid-cols-4">
          {products.map((product,idx)=>{
            return(<Card key={idx} product={product}/>)
          })}
        
        </div>
      </div>
    </> 
  );
};

export default Products;
