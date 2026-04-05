import React from "react";
import { CiShoppingCart } from "react-icons/ci";
import { FaStar } from "react-icons/fa";
import { setCart } from "../Redux/Cartslice";
import { useDispatch } from "react-redux";
import api from "../api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const makeSlug = (text = "") =>
  text
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");

const getProductSlug = (product) => product.slug || makeSlug(product.title);

const Card = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
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
    <div
      key={props.idx}
      className="group flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
    >
      <div
        onClick={() => navigate(`/products/${getProductSlug(product)}`)}
        className="relative overflow-hidden bg-slate-100 aspect-4/3 md:aspect-4/5 cursor-pointer"
      >
        <div className="absolute left-3 top-3 z-10 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-slate-700 shadow-sm backdrop-blur">
          {product.category}
        </div>
        <img
          className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
          src={product.image}
          alt={product.title}
        />
      </div>
      <div className="flex flex-1 flex-col gap-3 p-4 md:p-5">
        <div
          onClick={() => navigate(`/products/${getProductSlug(product)}`)}
          className="space-y-1 cursor-pointer"
        >
          <h1 className="text-base font-semibold text-slate-900 md:text-lg">
            {product.title}
          </h1>
          <p className="text-sm leading-6 text-slate-500">
            Quality product with a clean finish and modern presentation.
          </p>
        </div>

        <div className="flex items-center gap-1 text-sm font-semibold text-slate-700">
          4.4 <FaStar className="text-amber-400" />
          <span className="font-normal text-slate-400">rating</span>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3 pt-1">
          <span className="text-2xl font-bold tracking-tight text-slate-900">
            ₹{product.price}
          </span>
          <button
            type="button"
            onClick={handleaddtocart}
            aria-label={`Add ${product.title} to cart`}
            className="flex h-11 w-11 items-center justify-center rounded-full border border-slate-200 bg-slate-50 text-slate-700 transition hover:border-blue-500 hover:bg-blue-50 hover:text-blue-600"
          >
            <CiShoppingCart className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Card;
