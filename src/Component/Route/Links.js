import { useState } from "react";
import LinksNav from "./LinksNav";

const Links = () => {
  const [nav, setNav] = useState("none");
  return (
    <>
      <div className="navLink">
        <img
          style={{ width: "50px" }}
          alt="logo"
          src="https://png.pngtree.com/element_pic/16/11/02/bd886d7ccc6f8dd8db17e841233c9656.jpg"
        />
        <LinksNav />
        <div
          className="line"
          onClick={() => {
            nav === "none" ? setNav("block") : setNav("none");
          }}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      {/* {isSmallScreen?setNav("block"):setNav("none")} */}
      <div className="hide" style={{ display: `${nav}` }}>
        <LinksNav />
      </div>
    </>
  );
};

export default Links;
