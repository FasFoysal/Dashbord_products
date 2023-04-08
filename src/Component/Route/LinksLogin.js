import React from 'react'
import { NavLink } from "react-router-dom";
const LinksLogin = () => {
  return (
    <div>
        <NavLink style={{ marginRight: "10px" }} to="/login">
            Login
          </NavLink>
          <NavLink to="/signup">signup</NavLink>
    </div>
  )
}

export default LinksLogin