import React from "react";
import { CiDeliveryTruck } from "react-icons/ci";
import { GoShieldCheck } from "react-icons/go";
import { IoMdTrendingUp } from "react-icons/io";
const Servicecard = () => {
  const cards=[{
    logo:CiDeliveryTruck,
    heading:"Free Shipping",
    paragraph:"On orders over $50"
  },
{
    logo:GoShieldCheck,
    heading:"Secure Payments",
    paragraph:"256-bit SSL encryption"
  },
{
    logo:IoMdTrendingUp ,
    heading:"Best Prices",
    paragraph:"Competitive marketplace pricing"
  }]
  return (
    <div className="max-h-screen h-96 flex flex-col  justify-evenly min-w-screen px-4   bg-gray-200">
      {cards.map((card,idx)=>{
        const Icon=card.logo;
          return(<div key={idx} className=" flex gap-2.5 hover:shadow-sm bg-white rounded-xl p-5">
        
        <div>
          <div className="bg-indigo-100 rounded-xl p-2">
          {<Icon className="font-semibold text-3xl text-indigo-600"/>}
          </div>
        </div>
        <div>
          <h2 className="font-semibold">{card.heading}</h2>
          <p className="text-gray-500 text-sm">{card.paragraph}</p>
        </div>
      </div>)
        })}
      
    </div>
  );
};

export default Servicecard;
