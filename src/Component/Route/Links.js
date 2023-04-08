import { NavLink, Navigate } from "react-router-dom";

const Links = () => {
  const logout = () => {
    localStorage.clear();
    Navigate("/login");
  };
  let auth = localStorage.getItem("data");
  auth = JSON.parse(auth);

  return (
    <>
      <div className="navLink">
        <img
          style={{ width: "50px" }}
          alt="logo"
          src="https://png.pngtree.com/element_pic/16/11/02/bd886d7ccc6f8dd8db17e841233c9656.jpg"
        />
        <NavLink to="/Products">Products</NavLink>
        <NavLink to="/product/addproducts">Add Products</NavLink>
        <NavLink to={`/profile/${auth.name}/${auth._id}`}>Profile</NavLink>
        <NavLink to="/login" onClick={logout}>
          Logout ({auth.name})
        </NavLink>
      </div>
    </>
  );
};

export default Links;
