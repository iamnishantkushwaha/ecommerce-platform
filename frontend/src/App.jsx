import Signup from "./authpages/Signup";
import Login from "./authpages/Login";
import Home from "./pages/Home"
import { Route, Routes } from "react-router";
function App() {


 
  return (
    <>
    <Routes>
    <Route path="/login" element={<Login/>}/>
    <Route path="/signup" element={<Signup/>}/>
    <Route path="/" element={<Home/>}/>
  </Routes>
    </>
  );
}

export default App;
