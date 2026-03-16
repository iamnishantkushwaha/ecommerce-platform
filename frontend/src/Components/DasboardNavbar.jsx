import React from 'react'
import { AiOutlineMenu } from "react-icons/ai";
import { GoPerson } from "react-icons/go";
import { GoBell } from "react-icons/go";

const DasboardNavbar = () => {
  return (
    <div className='min-w-screen h-18 flex justify-between px-4 md:px-27 items-center border-b border-black'>
       <div className='flex items-center text-2xl gap-4'>< AiOutlineMenu/> <span className='text-xl font-bold'>My Account</span></div>
       <div className='text-2xl flex gap-4'><GoBell /><GoPerson /></div>
    </div>
  )
}

export default DasboardNavbar