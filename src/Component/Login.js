import React,{useState,useEffect} from "react";
import {useNavigate} from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';

const Login = (props) => {
    const navigate = useNavigate();
    useEffect(()=>{
        // private component
        const data = localStorage.getItem("data");
        if(data){
            navigate('/products');
        }
    })
    // input data set
    const [state, setState]  =useState({
        email:"",
        password:""
    })
    // useState add data
    const inputValue = (e)=>{
        const {name,value} = e.target;
        setState((p)=>{
            return{
                ...p,
                [name]:value
            }
        })
    }
    // submit data
    const submitData = async()=>{
        const {email,password} = state;
        if(email && password){
            try {
                const res = await axios.post("https://dashbord-server.onrender.com/login",{
                    email,password
                });
                // res.data 
                if(res.data.code === 0){
                    localStorage.setItem("data",JSON.stringify(res.data.resData[0]));
                    notify(res.data.code,"Login Successful"); // user all data come
                    setTimeout(()=>{
                        document.location.reload(true);
                    },1500)
                }else if(res.data.code === 1){
                    notify(res.data.code,res.data.mgs);
                }else if(res.data.code === 2){
                    notify(res.data.code,res.data.mgs);
                } 
            } catch (error) {
                // sarver of error
                // console.log(error)
                if(error.code === "ERR_NETWORK"){
                    notify("ERR_NETWORK","Server error plz wait we fixed soon");
                }
            }
        }else{
            notify(3,"Plz fill up all the fields");
        }
    }
    // tostify alert
    const notify = (code,mgs) => {
        switch (code){
            case 0:
                toast.success(mgs,{
                    position: "top-center",
                    them:"light"
                })
            break
            case 1:
                toast.info(mgs,{
                    position: "top-center",
                    them:"light"
                })
            break
            case 2:
                toast.info(mgs,{
                    position: "top-center",
                    them:"light"
                })
            break
            case 3:
                toast.warning(mgs,{
                    position: "top-center",
                    them:"light"
                })
            break
            case "ERR_NETWORK":
                toast.error(mgs,{
                    position: "top-center",
                    them:"dark"
                })
            break
            default:
                toast("Something wrong")
        }
    }

    // component return
  return (
    <>
      <div className="signup">
        <h1>
          <u>Login</u>
        </h1>
        <div className="signup_inputs">
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
          
          <button onClick={submitData} >Login</button>
          <p>
            Create Account{" "}
            <span
              onClick={() => {
                navigate("/signup");
              }}
              style={{ color: "blue", cursor: "pointer" }}
            >
              Click...
            </span>
          </p>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default Login;
