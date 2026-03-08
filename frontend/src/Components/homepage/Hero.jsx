import React from 'react'
import { Link } from 'react-router'
import { IoIosArrowRoundForward } from "react-icons/io";

const Hero = () => {
  return (
    <div className='min-h-screen min-w-screen px-4 flex flex-col justify-around bg-white py-10 '>
        <div className='flex flex-col mt-4 items-center justify-between gap-3'>
            <h3 className=' bg-indigo-100 rounded-2xl px-2.5 py-0.5 w-fit text-sm text-indigo-500'>🚀New Season Arrivals</h3>
            <h1 className='text-4xl py-5 text-center font-bold'>Discover Premium <span className='text-indigo-600'>Products Online</span></h1>
            <p className='text-center'>Shop from thousands of verified vendors. Quality products, fast delivery, and secure payments.Shop Now</p>
            <div className='flex gap-3'>
                <Link><button className='bg-indigo-600 py-2.5 flex items-center justify-center text-white font-semibold px-6 rounded-xl'>Shop Now<IoIosArrowRoundForward className='font-semibold pt-1 text-2xl'/></button></Link>
                <Link><button className='bg-gray-200 py-2.5  text-black font-semibold px-8 rounded-xl'>Become a Vendor</button></Link>
            </div>
            
            </div>
            <div className=''>
                <img className="rounded-2xl" src="https://res.cloudinary.com/dwgrcxx4o/image/upload/v1772901760/hero-banner-sbBafxHj_1_hl4yay.jpg" alt="hero-banner" />
            </div>
            
    </div>
  )
}

export default Hero