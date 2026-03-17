import React from 'react'
import { CiShoppingCart } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
const Card = (props) => {
    const product=props.product;
    console.log(product)
  return (
    <div
                  key={props.idx}
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
  )
}

export default Card