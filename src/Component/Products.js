import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { NavLink } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import Button from "@mui/material/Button";

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

// main component
const Products = () => {
  const [state, setState] = useState([]);
  const [filter, setFilter] = useState([]);
  const [search, setSearch] = useState(false);
  const [findValue, setFindValue] = useState("");
  useEffect(() => {
    sendProduct();
  }, []);
  useEffect(() => {
    searchData();
  }, [findValue]);

  const auth = JSON.parse(localStorage.getItem("data"));

  //filter myProduct
  const myProduct = () => {
    const user = auth._id;
    setState(() => {
      return state.filter((data) => {
        return data.userId === user;
      });
    });
    toast.success("Your products 🙃",{
      position:"top-center"
    })
  };

  //filter allProduct
  const allProduct = () => {
    setState(() => {
      return filter;
    });
    toast.success("All products 😀",{
      position:"top-center"
    })
  };

  // submit button data send
  const sendProduct = async () => {
    try {
      const res = await axios.post("http://localhost:8000/getProducts", {
        _id: user_Id._id,
      });
      if (res.status === 200) {
        if (res.data.code === 0) {
          setState(res.data.data);
          setFilter(res.data.data);
        } else if (res.data.code === 1) {
          notify(res.data.mgs, 1);
        } else if (res.data.code === 2) {
          notify(res.data.mgs, 2);
        }
      } else {
        notify(res.data.mgs, 999);
      }
    } catch (error) {
      notify("Server shutdown plz walt", 404);
    }
  };
  // delete item
  const deleteItem = async (id) => {
    try {
      let res = await axios.delete(
        `http://localhost:8000/productdelete?userid=${auth._id}&productid=${id}`
      );
      if (res.status === 200) {
        notify(res.data.mgs, res.data.code);
        sendProduct();
      }
    } catch (error) {
      console.log(error);
    }
  };
  // find product state set
  const searchData = async()=>{
    try {
      if(findValue){
      const res = await axios.get(`http://localhost:8000/searchdata/${user_Id._id}/${findValue}`)
      setState(res.data)
      }else{
        sendProduct()
      }
    } catch (error) {
      console.log(error);
    }
  }
 
  return (
    <>
      <div className="product">
        <div className="filter">
          <h3 className="uk-button uk-button-primary" onClick={allProduct}>
            All Products
          </h3>
          <h3 className="uk-button uk-button-primary" onClick={myProduct}>
            My Products
          </h3>
          <Button className="uk-animation-toggle" onClick={()=>{search?setSearch(false):setSearch(true)}} style={{ marginLeft: "10px" }} variant="outlined">
            <SearchIcon />
          </Button>
        </div>

        {
          search?
          <div className="uk-margin uk-text-center uk-animation-slide-bottom">
          <div className="uk-search uk-search-default">
            <input
              onChange={(e)=>{
                setFindValue(e.target.value);
              }}
              value={findValue}
              style={{background: "aliceblue"}}
              className="uk-search-input"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
          </div>
        </div>
        : ""
        }

        <div className="productMain">
          {
            state.length?
          state.map((data, index) => {
            return (
              <div key={index} className="uk-animation-slide-right">
                <div
                  style={{ width: "300px" }}
                  className="uk-card uk-card-default"
                >
                  <div className="uk-card-media-top uk-overflow-hidden">
                    <img
                      className="uk-animation-reverse uk-transform-origin-top-right"
                      uk-scrollspy="cls: uk-animation-kenburns; repeat: true"
                      src={data.img}
                      width="300"
                      height="200"
                      alt="product"
                    />
                  </div>
                  <div className="uk-card-body">
                    <h3 className="uk-card-title">Name: {data.name}</h3>
                    <p>Price: {data.price}$</p>
                    <p>category: {data.category}</p>
                    <p>company: {data.company}</p>
                    <div className="uk-flex uk-flex-center uk-flex-middle uk-margin-top">
                      {auth._id === data.userId ? (
                        <>
                          <button
                            style={{ height: "fit-content" }}
                            onClick={() => {
                              deleteItem(data._id);
                            }}
                            className="uk-button uk-button-danger uk-animation-fade"
                          >
                            Delete
                          </button>

                          <NavLink
                            style={{ marginLeft: "15px" }}
                            to={`/updateproducts/${data.name}/${data.price}/${data.category}/${data.company}/${data._id}`}
                            className="uk-button uk-button-primary"
                          >
                            Update
                          </NavLink>
                        </>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
            
          })
          :
            <h2 style={{margin:"auto"}}>No products found...</h2>
        }
        </div>
      </div>

      <ToastContainer />
    </>
  );
};

export default Products;
