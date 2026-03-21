import React, { useEffect } from "react";
import Navbar from "../../Components/Navbar";
import { FaPlus } from "react-icons/fa6";
import { FaMinus } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import {  removefromcart, setCart } from "../../Redux/Cartslice";

import api from "../../api";
import { useState ,useMemo} from "react";
export const Cart = () => {
  const dispatch=useDispatch()
  const [items, setItems] = useState([]);
  
   const [shipping,setshipping]=useState(0)
  useEffect(()=>{
    const fetchcart=async()=>{
    try{
      const res=await api.get("/user/cart");
    setItems(res.data.cart.products)
   
    }catch(err){
      console.log("Error in Cart",err);
    }
    }
  fetchcart()
  },[])

 const subtotal = useMemo(() => {
    return items.reduce((acc, item) => {
      const price = Number(item.product?.price) || 0;
      const quantity = Number(item.quantity) || 0;
      return acc + price * quantity;
    }, 0);
  }, [items]);


  const handleincreaseqty=async(item)=>{
    try{
      const latestitem=items.find((i)=>i.product._id===item.product._id);
      if(!latestitem) return;
      const res=await api.patch(`/user/cart/${item.product._id}`,{
        quantity:latestitem.quantity+1
       
      })
     
            setItems(res.data.cart.products)
        dispatch(setCart(res.data.cart.products));
      
    }catch(err)
    {
      console.log("Error in increment function in cart",err.message);
    }
  }

  const handledecreaseqty=async(item)=>{
    try{
     
      let res=await api.patch(`/user/cart/${item.product._id}`,{
        quantity:item.quantity-1
       
      })
         
         if(item.quantity-1==0)
         {
            res=await api.delete(`/user/cart/${item.product._id}`)
           dispatch(removefromcart(item.product_id))
         }
         setItems(res.data.cart.products)
           dispatch(setCart(res.data.cart.products));
         
    
      
    }catch(err)
    {
      console.log("Error in increment function in cart",err);
    }
  }
  return (
    <>
      <Navbar />
      <div className="min-h-screen min-w-screen px-4  bg-gray-200 flex flex-col gap-5 pt-20">
        <h2 className="text-2xl font-bold">Shopping Cart</h2>
        <div className="transition-transform duration-300 hover:scale-102">
          {items.map((item)=>{
            return(<div key={item._id} className="bg-white flex p-3 gap-4 flex-row hover:shadow-sm  rounded-xl">
            <img
              className="h-25 w-25  rounded-xl"
              src="../../../public/hero-banner-sbBafxHj.jpg"
              alt=""
            />
            <div className="flex flex-col gap-1">
              <h3 className="text-xl">{item.product.title}</h3>
              <h4>{item.product.category}</h4>
              <div className="flex  gap-2">
                <span className="flex gap-2 w-fit bg-white text-black rounded-lg pr-2 justify-center items-center">
                  <FaMinus onClick={()=>{handledecreaseqty(item)}}/>
                  <span className="p-1">{item.quantity}</span>
                  <FaPlus onClick={()=>{handleincreaseqty(item)}}/>
                </span>
                <span className="p-1">{(item.product.price*item.quantity).toFixed(2)}</span>
              </div>
            </div>
          </div>)
          })}
          
        </div>
        <div className="flex flex-col rounded-xl bg-white  p-5 gap-3">
          <h2 className="text-xl font-semibold">Order Summary</h2>
          <div className="flex flex-col">
            <div className=" border-b  font-extralight border-gray-400">
              <div className="flex py-2 justify-between items-center">
                <h3>Subtotal</h3>
                <h3>{(subtotal).toFixed()}</h3>
              </div>

              <div className="flex py-2 justify-between items-center">
                <h3>Shipping</h3>
                <h3>0</h3>
              </div>
            </div>
            <div className="text-2xl flex py-2 justify-between font-bold">
              <h2>Total</h2>
              <h2>{(subtotal+shipping).toFixed()}</h2>
            </div>
          </div>
          <button className="p-4 font-semibold bg-indigo-600 text-white rounded-xl">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </>
  );
};
