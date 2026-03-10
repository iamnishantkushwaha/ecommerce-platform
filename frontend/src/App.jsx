import Signup from "./authpages/Signup";
import Login from "./authpages/Login";
import Home from "./pages/Home"
import Navbar from "./Components/Navbar";
import Footer from "./Components/Footer";
import { Route, Routes } from "react-router";
function App() {


 
  return (
    <>
    <Navbar />
    <Routes>
    <Route path="/login" element={<Login/>}/>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/" element={<Home/>}/>
  </Routes>
  
   <Footer />
    </>
    
  );
}

export default App;
