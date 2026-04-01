import React from "react";
import { FiShoppingBag } from "react-icons/fi";
const Logopara = (props) => {
  return (
    <div className="min-h-24 py-4 px-4 gap-1.5 w-full flex flex-col justify-center items-center text-center">
      <h1 className="  text-indigo-600 gap-2 flex text-2xl font font-bold">
        <FiShoppingBag className="text-3xl" />
        {props.logotext}
      </h1>
      <p className="text-gray-400 ">{props.para}</p>
    </div>
  );
};

export default Logopara;
