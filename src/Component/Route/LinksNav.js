import { NavLink } from "react-router-dom";
import React from "react";

// auth check
let auth = localStorage.getItem("data");
auth = JSON.parse(auth);
// main component
const LinksNav = () => {
  const logout = () => {
    localStorage.clear();
    document.location.reload(true);
  };
  return (
    <>
      <NavLink to="/Products">Products</NavLink>
      <NavLink to="/product/addproducts">Add Products</NavLink>
      <NavLink to={`/profile/${auth.name}/${auth._id}`}>Profile</NavLink>
      <NavLink to="/login" onClick={logout}>
        Logout ({auth.name})
      </NavLink>
    </>
  );
};

export default LinksNav;
