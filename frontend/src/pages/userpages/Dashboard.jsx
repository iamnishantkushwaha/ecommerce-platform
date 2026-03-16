import React from 'react'
import DasboardNavbar from '../../Components/DasboardNavbar'
import Orders from './Orders'
import Profile from "./Profile"
import { Outlet } from 'react-router'
const Dashboard = () => {
  return (
    <div className='min-h-screen min-w-screen'>
      <DasboardNavbar/>
      
       <Outlet/>
    </div>
  )
}

export default Dashboard