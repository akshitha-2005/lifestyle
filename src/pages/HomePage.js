import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { collection, addDoc, getDocs } from "firebase/firestore";
import firebaseDB from "../firebaseConfig";
import { fireproducts } from "../firecommerce";
import { async } from "@firebase/util";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";


function HomePage() {
  // async function adddata() {
  //     try{
  //         await addDoc(collection(firebaseDB,"users"),{name: "Akshitha",age:22});
  //     }catch(error){
  //         console.log(error);
  //     }
  // }
  const [products, setProducts] = useState([]);
  const { cartItems } = useSelector((state) => state.cartReducer);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    getData();
  }, []);
  async function getData() {
    try {
      setLoading(true);
      const users = await getDocs(collection(firebaseDB, "products"));
      const productsArray = [];
      users.forEach((doc) => {
        const obj = {
          id: doc.id,
          ...doc.data(),
        };

        productsArray.push(obj);
        setLoading(false);
      });
      setProducts(productsArray);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  //     function addProductsData(){
  //     fireproducts.map(async (product) =>{
  //         try{
  //             await addDoc(collection(firebaseDB,"products"),product);
  //         }catch(error){
  //             console.log(error);
  //         }
  //     })
  // }
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };
  


  return (
    <Layout loading={loading}>
      <div className="container">
        <div className="row">
          {products.map((product) => {
            console.log(product);
            return (
              <div className="col-md-3">
                <div className="m-2 p-1 product position-relative">
                  <div className="product-content">
                    <p>{product.name}</p>
                    </div>
                    <div className="text-center">
                      <img
                        src={product.imageURL}
                        alt=""
                        className="product-img"
                      />
                    </div>
                  
                  <div className="product-actions">
                    <h2>Rs.{product.price}</h2>
                    <div className="d-flex">
                    {/* <Button variant="outlined" onClick={() => addToCart({...product,quantity:1})}>ADD TO CART</Button> */}
                    <Button variant="outlined" onClick={() => addToCart(product)}>ADD TO CART</Button>
                    &nbsp;&nbsp;&nbsp;
                  
                      <Button variant="outlined"
                        onClick={() => {
                          navigate(`/productinfo/${product.id}`);
                        }}
                      >
                        VIEW
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* <button onClick={adddata}>add data</button> */}

      {/* <button onClick={addProductsData}>add data to firebase</button> */}
    </Layout>
  );
}

export default HomePage;
