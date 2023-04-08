import React, { useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import axios from 'axios';

// Signup function
const Signup = () => {
   // react-dom navigate
   const navigate = useNavigate();
  useEffect(()=>{
    // private component
    const data = localStorage.getItem("data");
    if(data){
        navigate('/products');
    }
})

  // input data set
  let [state, setState] = useState({
    name: "",
    email: "",
    password: "",
  });
  // set useState
  const inputValue = (e) => {
    const { value, name } = e.target;
    setState((p) => {
      return {
        ...p,
        [name]: value,
      };
    });
  };
  // input data submit function
  const submitData = async() => {
    const {name,email,password} = state;
    if ( name && email && password.length >= 4) {
      try {
        const res = await axios.post("https://dashbord-server.onrender.com/signup",{
          name,email,password
        })
        if(res.status === 200){
          if(res.data.code === 3){
            notify("plz login",res.data.mgs);
          }else if(res.data.code === 1){
            notify("success",res.data.mgs);
            setTimeout(()=>{
              navigate('/');
            },1500)
          }else if(res.data.code === 4){
            notify("more",res.data.mgs);
          }
        }else{
          console.log(res);
        }
      } catch (error) {
        console.log(error);
      }
      
    } else {
        notify("fill");
    }
  };
  // tostify alert function
  const notify = (val,mgs) => {
    switch (val) {
        case "plz login":
          toast.warning(mgs, {
            position: "top-center",
            theme: "dark",
           });
           setTimeout(()=>{
            navigate("/");
           },2000)
        break
        case "success":
            toast.success(mgs, {
             position: "top-center",
             theme: "dark",
            });
        break
        case "fill":
            toast.warning("Fill up not compleate", {
                position: "top-center",
                theme: "dark",
               });
        break
        case "more":
            toast.warning(mgs, {
                position: "top-center",
                theme: "dark",
               });
        break
        default:
            toast(mgs, {
                position: "top-right",
                theme: "dark",
            });
    }
  };
  // component return
  return (
    <>
      <div className="signup">
        <h1>
          <u>Signup</u>
        </h1>
        <div className="signup_inputs">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter your name"
            onChange={inputValue}
            value={state.name}
          />
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Enter you email"
            onChange={inputValue}
            value={state.email}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            onChange={inputValue}
            value={state.password}
          />
          <label style={{ color: "red" }} htmlFor="password">
            Password must be 4 latter
          </label>
          <button onClick={submitData}>Signup</button>
          <p>I have already account <span onClick={()=>{navigate("/")}} style={{color:"blue",cursor:"pointer"}}>Click...</span></p>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Signup;
