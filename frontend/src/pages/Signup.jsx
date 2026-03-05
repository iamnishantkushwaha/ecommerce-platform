import React from "react";
import { useState } from "react";
import { FiShoppingBag } from "react-icons/fi";
import { IoMdPerson } from "react-icons/io";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import CustomRoleSelect from "../ui/CustomRoleSelect";
const Signup = () => {
  const [Selected, setSelected] = useState("USER");
  const [Fullname,setFullname]=useState("");
  const [Email,setemail]=useState("");
  const [Phonenumber,setPhonenumber]=useState("");
  const [password,setPassword]=useState("");
  const [role,setrole]=useState("USER");
  const [show,setshow]=useState(false);
  const handleChange = (e) => {
    setSelected(e.target.value);
  };
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F1F2F4] min-w-screen">
      <div className=" h-40 p-4   gap-1.5 w-full  flex flex-col justify-center items-center">
        <h1 className="  text-indigo-600 gap-2 flex text-2xl font font-bold">
          <FiShoppingBag className="text-3xl" />
          MarketPro
        </h1>
        <p className="text-gray-400 ">Create your account to get started</p>
      </div>
      <div className="h-full mb-15 py-auto bg-white rounded-xl mx-4 px-8 py-3 md:px-12 lg:px-14" >
        <div className=" h-40  gap-1 w-full flex flex-col justify-center items-center">
          <h1 className="   gap-2 flex  font-semibold font text-3xl">
            Create Account
          </h1>
          <p className="text-gray-400 text-center">
            Fill in your details to create a new account
          </p>
        </div>
        <form className="flex flex-col gap-3 text-lg " onSubmit={(e)=>e.preventDefault()}>
          <div className="flex flex-col">
            <label className="font-semibold" htmlFor="fullname">Full Name</label>
            <input
              className="outline-none bg-gray-200 rounded-xl p-3"
              placeholder="John Doe"
              id="fullname"
              name="fullName"
              type="text"
              value={Fullname}
              onChange={(e)=>setFullname(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold" htmlFor="email">Email</label>
            <input
              className="outline-none bg-gray-200 rounded-xl p-3"
              placeholder="john@gmail.com"
              id="email"
              name="email"
              type="email"
              value={Email}
              onChange={(e)=>setemail(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
            <label className="font-semibold" htmlFor="phoneNumber">Phone Number</label>
            <input
              className="outline-none bg-gray-200 rounded-xl p-3"
              max={10}
              placeholder="9632587412"
              id="phoneNumber"
              name="phoneNumber"
              type="tel"
              value={Phonenumber}
              onChange={(e)=>setPhonenumber(e.target.value)}
            />
          </div>
          <div className="flex flex-col relative">
            <label className="font-semibold" htmlFor="password">Password</label>
             <IoMdEye onClick={()=>setshow(!show)} className={!show?"absolute top-12 right-3.5":"hidden"}/>
             <IoMdEyeOff onClick={()=>setshow(!show)} className={show?"absolute top-12 right-3.5":"hidden"}/> 
            <input
              className="outline-none bg-gray-200 rounded-xl p-3"
              placeholder="******"
              id="password"
              name="password"
              type={show?"text":"password"}
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col">
          
            <CustomRoleSelect role={role} setRole={setrole}/>
          </div>
          <div className="inline">
            <input type="radio" name="agree" id="agree" />
            <label className="text-sm pl-1.5" htmlFor="agree">
              I agree to the{" "}
              <a href="" className="text-indigo-600">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="" className="text-indigo-600">
                Privacy Policy
              </a>
            </label>
          </div>
          <div className="flex items-center justify-center">
            <button type="submit"className="px-15 py-3 text-white  rounded-xl bg-indigo-600">
              Create Account
            </button>
          </div>
          <p className="text-sm mb-10  text-center">
            Already have an account? 
            <a href="" className="text-indigo-600">
              &nbsp;Sign in
            </a>{" "}
          </p>
        </form>
      </div>
    </div>
  );
};

export default Signup;
