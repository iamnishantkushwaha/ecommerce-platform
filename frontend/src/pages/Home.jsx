import React from 'react'
import Navbar from "../Components/Navbar"
import Hero from '../Components/homepage/Hero'
import Servicecard from '../Components/homepage/Servicecard'
import BrowseCategories from '../Components/homepage/BrowseCategories'
import Featuredproducts from '../Components/homepage/Featuredproducts'
const Home = () => {
  return (
    <div className='min-h-screen min-w-screen bg-gray-200'><Navbar />
    <Hero />
    <Servicecard />
    <BrowseCategories/>
    <Featuredproducts />
    </div>
  )
}

export default Home