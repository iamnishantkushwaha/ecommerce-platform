import React from 'react'
import { Outlet,Navigate } from 'react-router'

const ProtectedRoute = ({ isAuthenticated ,user,allowedRoles}) => {

 if(!isAuthenticated)
 {
   <Navigate to="/login" replace />;
 }

   if (!allowedRoles.includes(user?.role)) {
    if (user?.role === "VENDOR") {
      return <Navigate to="/vendor/dashboard" replace />;
    }

    if (user?.role === "ADMIN") {
      return <Navigate to="/admin/dashboard" replace />;
    }

    return <Navigate to="/" replace />;
     
  }
  return <Outlet />;
}

export default ProtectedRoute
