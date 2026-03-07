import React from 'react'
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { useState } from "react";
import Logopara from '../ui/Logopara';
import { Link, useNavigate } from 'react-router';
import api from "../api"
const Login = () => {
    const [email,setemail]=useState("");
     const [password,setPassword]=useState("");
     const [show,setshow]=useState(false);
     const Navigate=useNavigate()

      const handleLogin=async(e)=>{
        e.preventDefault();
        try{
  const res=await api.post(`/login`,{email,password})
        setemail("");
        setPassword("");
        console.log(res?.data.message);
      Navigate("/")
        }catch(err)
        {
          console.log("Error in Login page: ",err);
        }
       
      }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F1F2F4] min-w-screen">
     <Logopara logotext="MarketPro" para="Welcome back! Sign in to your account"/>
      <div className="h-full mb-15 py-auto bg-white rounded-xl mx-4 px-8 py-3 md:px-12 lg:px-14" >
        <div className=" h-40  gap-1 w-full flex flex-col justify-center items-center">
          <h1 className="   gap-2 flex  font-semibold font text-3xl">
         Sign In
          </h1>
          <p className="text-gray-400 text-center">
            Enter your credentials to access your account
          </p>
        </div>
        <form className="flex flex-col gap-3 text-lg " onSubmit={handleLogin}>
          
          <div className="flex flex-col">
            <label className="font-semibold" htmlFor="email">email</label>
            <input
              className="outline-none bg-gray-200 rounded-xl p-3"
              placeholder="john@gmail.com"
              id="email"
              name="email"
              type="email"
              value={email}
              autoComplete='email'
              onChange={(e)=>setemail(e.target.value)}
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
              autoComplete='current-password'
              onChange={(e)=>setPassword(e.target.value)}
            />
          </div>
          
          <div className="inline">
            <input type="radio" name="agree" id="agree" />
            <label className="text-sm pl-1.5" htmlFor="agree">
             
           Remember me for 30 days
            </label>
          </div>
          <div className="flex items-center justify-center">
            <button type="submit"className="px-15 py-3 text-white  rounded-xl bg-indigo-600">
             Sign In
            </button>
          </div>
          <p className="text-sm mb-10  text-center">
           Don't have an account?
        
              &nbsp; <Link className="text-indigo-600" to="/signup">Sign up</Link>
            
          </p>
        </form>
      </div>
    </div>
  )
}

export default Login