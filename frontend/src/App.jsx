import Signup from "./authpages/Signup";
import Login from "./authpages/Login";
import Home from "./pages/Home"
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { Route, Routes } from "react-router";
import Dashboard from "./pages/userpages/Dashboard";
import Profile from "./pages/userpages/Profile";
import Orders from "./pages/userpages/Orders";
import Setting from "./pages/userpages/Setting";
import Products from "./pages/userpages/Products";
function App() {


 
  return (
    <>
     
    <Routes>
    <Route path="/login" element={<Login/>}/>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/" element={<Home/>}/>
    <Route path="/dashboard" element={<Dashboard/>}>
    <Route path="orders" element={<Orders/>}/>
     <Route path="profile" element={<Profile/>}/>
      <Route path="setting" element={<Setting/>}/>
     </Route>
     <Route path="/products" element={<Products/>}/>
 </Routes>
       
    </>
    
  );
}

export default App;
