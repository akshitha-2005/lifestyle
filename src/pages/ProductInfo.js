import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { collection, getDoc, doc } from "firebase/firestore";
import firebaseDB from "../firebaseConfig";
import { async } from "@firebase/util";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector} from 'react-redux';
import { Button } from "@mui/material";
function ProductInfo() {
  const [product, setProduct] = useState();
  const [loading, setLoading] = useState(false)
  const { cartItems } = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();
  const params = useParams();
  
  useEffect(() => {
    getData();
  }, []);


  async function getData() {
    try {
      setLoading(true);
      const productTemp = await getDoc(
        doc(firebaseDB, "products", params.productid)
      );

      setProduct(productTemp.data());
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <Layout loading={loading}>
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10">
            <h2>Description</h2>
            {product && (
              <div className="box">
               
                <p className="center">
                  <b>{product.name}</b>
                </p>
                <div className="container">
                <img src={product.imageURL} className="product-info-img" />
                &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp; &nbsp;&nbsp;&nbsp;
                <ul>
                  {product.description.map((a,i) => <li>{a}</li>)}
                </ul>
                </div>
                <h3 className="center">Rs.{product.price}</h3>
              
                <div className="d-flex justify-content-end my-3">
                  
                  <Button variant="outlined" onClick={() => {addToCart(product)}}>ADD TO CART</Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

    </Layout>
  );
}

export default ProductInfo;

