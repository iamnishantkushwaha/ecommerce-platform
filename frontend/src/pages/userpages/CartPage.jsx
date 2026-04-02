import React, { useEffect, useMemo, useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { removefromcart, setCart } from "../../Redux/Cartslice";
import api from "../../api";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const shipping = 0;

  useEffect(() => {
    const fetchcart = async () => {
      try {
        const res = await api.get("/user/cart");
        setItems(res.data.cart.products);
        dispatch(setCart(res.data.cart.products));
      } catch (err) {
        console.log("Error in Cart", err);
      }
    };
    fetchcart();
  }, [dispatch]);

  const subtotal = useMemo(() => {
    return items.reduce((acc, item) => {
      const price = Number(item.product?.price) || 0;
      const quantity = Number(item.quantity) || 0;
      return acc + price * quantity;
    }, 0);
  }, [items]);

  const handleincreaseqty = async (item) => {
    try {
      const res = await api.patch(`/user/cart/${item.product._id}`, {
        quantity: item.quantity + 1,
      });

      setItems(res.data.cart.products);
      dispatch(setCart(res.data.cart.products));
    } catch (err) {
      console.log("Error in increment", err.message);
    }
  };

  const handledecreaseqty = async (item) => {
    try {
      let res = await api.patch(`/user/cart/${item.product._id}`, {
        quantity: item.quantity - 1,
      });

      if (item.quantity - 1 === 0) {
        res = await api.delete(`/user/cart/${item.product._id}`);
        dispatch(removefromcart(item.product._id));
      }

      setItems(res.data.cart.products);
      dispatch(setCart(res.data.cart.products));
    } catch (err) {
      console.log("Error in decrement", err);
    }
  };

  return (
    <div className="min-h-screen w-screen md:w-full pb-10 px-4 md:px-6 lg:px-10 bg-gray-200 flex flex-col gap-5 pt-20">
      <h2 className="text-2xl font-bold">Shopping Cart</h2>

      {items.length === 0 ? (
        <div className="w-full min-h-[30vh] md:min-h-[50vh] flex items-center justify-center font-bold text-2xl text-center">
          Cart is Empty
        </div>
      ) : (
        <div className="flex flex-col h-fit md:flex-row md:gap-6  gap-10">
          <div className="md:w-3/5 flex flex-col gap-6 max-h-[70vh] md:max-h-[75vh]  overflow-y-auto ">
            {items.map((item) => (
              <div
                key={item._id}
                className="bg-white flex p-3 gap-4 rounded-xl"
              >
                <img
                  className="h-20 w-20 md:h-25 md:w-25 rounded-xl"
                  src="../../../public/hero-banner-sbBafxHj.jpg"
                  alt=""
                />

                <div className="flex flex-col gap-1">
                  <h3 className="text-xl">{item.product.title}</h3>
                  <h4>{item.product.category}</h4>

                  <div className="flex gap-2">
                    <span className="flex gap-2 bg-gray-200 rounded-lg px-2 items-center">
                      <FaMinus onClick={() => handledecreaseqty(item)} />
                      <span>{item.quantity}</span>
                      <FaPlus onClick={() => handleincreaseqty(item)} />
                    </span>

                    <span>
                      {(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="md:w-2/5 md:h-fit rounded-xl bg-white p-5">
            <h2 className="text-xl font-semibold">Order Summary</h2>

            <div className="border-b border-gray-400 py-2">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{subtotal.toFixed()}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>0</span>
              </div>
            </div>

            <div className="flex justify-between font-bold text-xl py-2">
              <span>Total</span>
              <span>{(subtotal + shipping).toFixed()}</span>
            </div>

            <button
              onClick={() => {navigate("/cart/checkout")}}
              className="w-full mt-4 p-4 bg-indigo-600 text-white rounded-xl"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
