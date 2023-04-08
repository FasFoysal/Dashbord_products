import { NavLink } from "react-router-dom";
const Links2 = () => {
  return (
    <>
      <div style={{justifyContent: "space-between"}} className="navLink navRight">
            <div>
            <img style={{width:"50px"}} alt="logo" src="https://png.pngtree.com/element_pic/16/11/02/bd886d7ccc6f8dd8db17e841233c9656.jpg"/>
            </div>
            <div>
            <NavLink style={{marginRight:"10px"}} to="/login">Login</NavLink>
            <NavLink to="/signup">signup</NavLink>
            </div>
      </div>
    </>
  );
};

export default Links2;
