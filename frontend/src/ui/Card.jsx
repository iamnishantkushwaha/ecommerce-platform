import React from "react";
import { CiShoppingCart } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { setCart } from "../Redux/Cartslice";
import { useDispatch } from "react-redux";
import api from "../api";
const Card = (props) => {
  const dispatch = useDispatch();
  const product = props.product;

  const handleaddtocart = async () => {
    try {
      const res = await api.post("/user/cart", {
        productId: product._id,
        quantity: 1,
      });
      toast.success("Product is added to cart Successfully");
      console.log(res.data.cart);
      dispatch(setCart(res.data.cart.products));
    } catch (err) {
       toast.error(err.response?.data?.message);
      console.log("Error in Card:", err);
    }
  };
  return (
    <div key={props.idx} className="flex flex-col rounded-xl h-auto bg-white">
      <div className="overflow-hidden rounded-t-xl aspect-4/3 md:aspect-4/5">
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
          <button
            onClick={handleaddtocart}
            className="hover:bg-indigo-200 p-2 hover:rounded-4xl"
          >
            <CiShoppingCart className="text-2xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
