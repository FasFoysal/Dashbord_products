import { Route, Routes, Navigate } from "react-router-dom";
import Links from "./Links";
import Link2 from "./Links2";
import Signup from "./../Signup";
import Login from "./../Login";
import PrivateComponent from "../PrivateComponent";
import AddProduct from "../AddProduct";
import Products from "../Products";
import UpdateProduct from "../UpdateProduct";
import Profile from "../Profile";


// main component
const Manu = () => {
  const data = localStorage.getItem("data");
  return (
    <>
      {/* link set with  */}
      {data ? <Links /> : <Link2 />}

      <Routes>
        {/* private Component  */}
        <Route element={<PrivateComponent />}>
          <Route path="/Products" element={<Products />} />
          <Route path="/product/addproducts" element={<AddProduct />} />
          <Route
            path="/updateproducts/:product/:price/:category/:company/:productId"
            element={<UpdateProduct />}
          />
          <Route path="/profile/:auth/:id" element={<Profile />} />
          <Route path="/logout" element={<p>Hi /logout</p>} />
        </Route>

        <Route path="*" element={<Navigate to="/login" />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
};

export default Manu;
