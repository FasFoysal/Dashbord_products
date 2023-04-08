import { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

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
// main coponent
const AddProduct = () => {
  const userId = user_Id._id;
  // imput state manage
  const [state, setState] = useState({
    name: "",
    price: "",
    category: "",
    company: "",
    userId:userId,
  });
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
    let { name, price, category, company, userId } = state;
    if (name && price && category && company && userId) {
      try {
        const res = await axios.post("http://localhost:8000/addproduct", {
          name,
          price,
          category,
          company,
          userId,
        });
        if (res.status === 200) {
          notify(res.data.mgs, res.data.code);
          setState({
            name: "",
            price: "",
            category: "",
            company: "",
            userId:user_Id._id
          })
        } else {
          notify(res.data.mgs, 999);
        }
      } catch (error) {
        notify("Server shutdown plz walt", 404);
      }
    } else {
      notify("Fillup all the fields", 2);
    }
  };
  return (
    <>
      <div className="signup">
        <h1 style={{color:"darkblue"}}>
          <u>Add Product</u>
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
          <button onClick={sendProduct}>Add</button>
        </div>
      </div>
      <ToastContainer />
    </>
  );
};

export default AddProduct;
