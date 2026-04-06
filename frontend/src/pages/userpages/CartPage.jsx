import React, { useEffect, useMemo, useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { removefromcart, setCart } from "../../Redux/Cartslice";
import api from "../../api";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin6Line } from "react-icons/ri";

const CartPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [items, setItems] = useState([]);
  const shipping = 0;

  useEffect(() => {
    const fetchcart = async () => {
      try {
        const res = await api.get("/user/cart");
        setItems(res?.data?.cart?.products);
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



  const handledeletproduct=async(id)=>{
    try{
      const res=await api.delete(`user/cart/${id}`)
      toast.success("Cart item Deleted Successfully")
    }catch(err){
      
      console.log("Error in Cart page",err.message)
    }
  }
  return (
    <div className="min-h-screen w-screen md:w-full pb-10 px-4 md:px-8 lg:px-10 flex flex-col gap-5 pt-24 bg-slate-50">
      <div className="mx-auto w-full max-w-7xl pt-2">
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
          Shopping Cart
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Review your items and complete checkout
        </p>
      </div>

      {items.length === 0 ? (
        <div className="mx-auto w-full max-w-7xl rounded-2xl border border-dashed border-slate-300 bg-white min-h-[30vh] md:min-h-[50vh] flex items-center justify-center font-bold text-2xl text-center text-slate-600">
          Cart is empty
        </div>
      ) : (
        <div className="mx-auto flex w-full max-w-7xl flex-col h-fit md:flex-row md:gap-6 gap-8">
          <div className="md:w-3/5 flex flex-col gap-4 max-h-[72vh] md:max-h-[75vh] overflow-y-auto pr-1">
            {items.map((item) => (
              <div
                key={item._id}
                className="bg-white border border-slate-200 flex p-4 gap-4 rounded-2xl shadow-sm"
              >
                <img
                  className="h-20 w-20 md:h-24 md:w-24 rounded-xl object-cover"
                  src={item.product.image}
                  alt=""
                />

                <div className="flex flex-col gap-2 flex-1">
                  <div className="flex items-center justify-between"><h3 className="text-xl font-semibold text-slate-900">
                    {item.product.title}
                  </h3><RiDeleteBin6Line onClick={()=>handledeletproduct(item._id)} className="text-red-500 text-xl"/></div>
                  <h4 className="text-sm text-slate-500">
                    {item.product.category}
                  </h4>

                  <div className="flex items-center justify-between gap-2">
                    <span className="flex gap-3 bg-slate-100 rounded-lg px-3 py-2 items-center">
                      <FaMinus
                        className="cursor-pointer text-slate-700"
                        onClick={() => handledecreaseqty(item)}
                      />
                      <span className="font-semibold text-slate-900">
                        {item.quantity}
                      </span>
                      <FaPlus
                        className="cursor-pointer text-slate-700"
                        onClick={() => handleincreaseqty(item)}
                      />
                    </span>

                    <span className="font-bold text-slate-900">
                      ₹{(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="md:w-2/5 md:h-fit rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold text-slate-900">
              Order Summary
            </h2>

            <div className="border-b border-slate-200 py-4 space-y-2 mt-1">
              <div className="flex justify-between">
                <span className="text-slate-600">Subtotal</span>
                <span className="font-semibold text-slate-900">
                  ₹{subtotal.toFixed()}
                </span>
              </div>

              <div className="flex justify-between">
                <span className="text-slate-600">Shipping</span>
                <span className="font-semibold text-slate-900">₹0</span>
              </div>
            </div>

            <div className="flex justify-between font-bold text-xl py-4">
              <span>Total</span>
              <span>₹{(subtotal + shipping).toFixed()}</span>
            </div>

            <button
              onClick={() => {
                navigate("/cart/checkout");
              }}
              className="w-full mt-2 p-4 rounded-xl bg-slate-900 text-white font-semibold transition hover:bg-blue-500"
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
