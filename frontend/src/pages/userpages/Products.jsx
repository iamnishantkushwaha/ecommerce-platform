import React, { useEffect } from "react";
import Navbar from "../../Components/Navbar";
import { IoMdSearch } from "react-icons/io";
import { FaFilter } from "react-icons/fa";
import { useState } from "react";
import FilterDropdown from "../../ui/FilterDropdown";
import api from "../../api";
import Card from "../../ui/Card";
const Products = () => {
  const categories = [
    "Electronics",
    "Clothing",
    "Home & Garden",
    "Sports",
    "Books",
    "Accessories",
  ];
  const [selectedcategories,setselectedcategories]=useState([]);
  const [products, setproducts] = useState([]);
  const [openfilter, setopenfilter] = useState(false);
  const [Minprice,setMinprice]=useState();
  const [Maxprice,setMaxprice]=useState();
  const [search,setsearch]=useState();
  const [sort,setsort]=useState();
  const filterdropdown = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price_asc" },
  { label: "Price: High to Low", value: "price_desc" }
];
  useEffect(() => {

    const fetchproducts = async () => {
      try{
        let params=new URLSearchParams();

        if(selectedcategories.length>0)
        {
          params.append("category",selectedcategories.join(",").toLowerCase());
        }
        if(sort){
          params.append("sort",sort);
        }
        if(search)
        {
          params.append("search",search);
        }
        if(Minprice)
        {
          params.append("minprice",Minprice)
        }
        if(Maxprice)
        {
          params.append("maxprice",Maxprice);
        }

      const res = await api.get(`/products?${params.toString()}`);
     
      setproducts(res.data.products);
      }catch(err){
       console.log("Error in Products",err);
    }
     
    }
    fetchproducts();
  }, [selectedcategories,Minprice,Maxprice,sort,search]);

 
  const handlecategorychange=(category)=>{
       setselectedcategories((prev)=>
        prev.includes(category)?prev.filter((item)=>item!=category):[...prev,category]
       )
  }
  return (
    <>
      <Navbar />{" "}
      <div className=" relative min-w-screen min-h-screen md:px-27 flex-col md:flex-row md:gap-6 flex  bg-gray-100 px-4 pt-25">
        {/* for mobile */}
        {openfilter && (
          <div className="flex rounded-xl flex-col gap-3 bg-white p-4">
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
                      checked={selectedcategories.includes(category)}
                      onChange={()=>handlecategorychange(category)}
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
                  onChange={(e)=>setMinprice(e.target.value)}
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
                  onChange={(e)=>setMaxprice(e.target.value)}
                  name="maxprice"
                  id="manprice"
                />
              </div>
            </div>
          </div>
        )}

        {/* for Desktop */}

        <div className="md:flex hidden rounded-xl flex-col md:h-1/2 gap-3 bg-white p-4">
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
                    checked={selectedcategories.includes(category)}
                      onChange={()=>handlecategorychange(category)}
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
                 onChange={(e)=>setMinprice(e.target.value)}
                name="minprice"
                id="minprice"
              />
              -
              <input
                type="text"
                className="p-2 border outline-0 border-gray-100  w-30 h-fit rounded-e-xl "
                placeholder="Max"
                onChange={(e)=>setMaxprice(e.target.value)}
                name="maxprice"
                id="manprice"
              />
            </div>
          </div>
        </div>

        <IoMdSearch
          className={
            !openfilter
              ? " md:left-113 absolute md:top-28 top-28 left-8 text-xl text-gray-400 "
              : "absolute top-134 left-8 text-xl text-gray-400"
          }
        />
        <div className="flex flex-col gap-6">
          <div className="flex md:flex-row flex-col gap-3 ">
            <input
              className="bg-white outline-0 border pl-8 w-full border-gray-200 p-2  rounded-xl md:h-10 "
              type="text"
              onChange={(e)=>setsearch(e.target.value)}
              name="search"
              id="search"
              placeholder="Search for product"
            />
            <div className="flex  gap-5">
              {
                <div className="p-3 rounded-lg border flex h-fit w-fit md:hidden border-gray-400">
                  <FaFilter onClick={() => setopenfilter(!openfilter)} />
                </div>
              }
              <FilterDropdown onChange={(value)=>setsort(value)} options={filterdropdown} />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-5 md:grid-cols-3">
            {products.map((product, idx) => {
              return <Card key={idx} product={product} />;
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default Products;
