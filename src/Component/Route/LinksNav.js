import { NavLink, Navigate } from "react-router-dom";
import React from "react";

const logout = () => {
  localStorage.clear();
  Navigate("/login");
};
let auth = localStorage.getItem("data");
auth = JSON.parse(auth);

const LinksNav = () => {
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
