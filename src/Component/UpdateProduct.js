import { useState, useEffect,  } from "react";
import { ToastContainer, toast } from "react-toastify";
import  axios  from "axios";
import {useParams,useNavigate} from 'react-router-dom';

// user get
const auth = localStorage.getItem("data");
let user_Id = JSON.parse(auth);


//toastify alert
const notify = (val, code) => {
  switch (code) {
    case 0:
      toast.success(val, {
        position: "top-right",
      });
      break;
    case 1:
      toast.warning(val, {
        position: "top-right",
      });
      break;
    case 2:
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
// main component
const UpdateProduct = () => {
  const userId = user_Id._id;
  // imput state manage
  const [state, setState] = useState({
    name: "",
    price: "",
    category: "",
    company: "",
    userId:userId,
  });
  const navigate = useNavigate();
  // get product data in params
  const params = useParams();
  useEffect(()=>{
    let {product,price,category,company} = params
    if(params){
      setState((p)=>{
        return{
          ...p,
            name:product,
            price:price,
            category:category,
            company:company
        }
      })
    }
  },[])


  
   // input value set
   const inputValue = (p) => {
    const { name, value } = p.target;

    setState((p) => {
      return {
        ...p,
        [name]: value,
      };
    });
  };
  // submit button data send
  const sendProduct = async () => {
    let { name,userId ,category,company,price} = state;
      try {
        const res = await axios.patch(`https://dashbord-server.onrender.com/productupdate?userid=${userId}&productid=${params.productId}`,{
          name:name,
          "price":price,
          "category":category,
          "userId":userId,
          "company":company
        })
        if (res.status === 200) {
          notify(res.data.mgs, res.data.code);
        } else {
          notify(res.data.mgs, 999);
        }
      } catch (error) {
        console.log(error);
        notify("Server shutdown plz walt", 404);
      }
    
  };
  return (
    <>
      <div className="signup">
        <h1 style={{color:"blue"}}>
          <u>Update Product</u>
        </h1>
        <div className="signup_inputs">
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Enter The product name"
            onChange={inputValue}
            value={state.name}
          />
          <input
            type="number"
            name="price"
            id="price"
            placeholder="Enter product price in doller"
            onChange={inputValue}
            value={state.price}
          />
          <input
            type="text"
            name="category"
            id="category"
            placeholder="Enter the category"
            onChange={inputValue}
            value={state.category}
          />
          <input
            type="text"
            name="company"
            id="company"
            placeholder="Enter the company name"
            onChange={inputValue}
            value={state.company}
          />
          <div className="uk-flex"> 
          <button onClick={sendProduct}>Update</button>
          <button onClick={()=>{navigate("/Products")}} style={{marginLeft:"10px",backgroundColor:"lightblue"}}>Back</button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default UpdateProduct;
