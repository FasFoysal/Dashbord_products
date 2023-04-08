import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

const auth = JSON.parse(localStorage.getItem("data"));

// main component
const Profile = () => {
  const [state, setState] = useState([]);
  // const [mainData, setMainData] = useState([]);
  let arr = [];
  useEffect(() => {
    sendProduct();
  });
  //toastify alert
  const notify = (val, code) => {
    switch (code) {
      case 0:
        toast.success(val, {
          position: "top-right",
        });
        break;
      case 1 || 2 || 3:
        toast.warning(val, {
          position: "top-right",
        });
        break;
      case 404:
        toast.error(val, {
          position: "top-right",
        });
        break;
      default:
        toast.error(val, {
          position: "top-right",
        });
    }
  };

  // submit button data send
  const sendProduct = async () => {
    try {
      const res = await axios.post("http://localhost:8000/getProducts", {
        _id: auth._id,
      });
      if (res.status === 200) {
        setState(res.data.data);
      } else {
        notify(res.data.mgs, 999);
      }
    } catch (error) {
      notify("Server shutdown plz walt", 404);
    }
  };
  return (
    <>
      {state.forEach((data, i) => {
        if (data.userId === auth._id) {
          arr.push(data);
        }
      })}
      <div className="profile">
        <div className="prifileMain">
          <h1>
            <u>Profile</u>
          </h1>
          <div className="profileContainer">
            <h2>
              Name: <span style={{ color: "orange" }}>{auth.name}</span>{" "}
            </h2>
            <h2>
              Gmail: <span style={{ color: "orange" }}>{auth.email}</span>
            </h2>
            <h2>Total product add: <span style={{ color: "orange" }}>{arr.length}</span> items</h2>
            <h2>
              Id: <span style={{ color: "orange" }}>{auth._id}</span>
            </h2>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Profile;
