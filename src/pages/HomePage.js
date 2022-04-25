import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { collection, addDoc, getDocs } from "firebase/firestore";
import firebaseDB from "../firebaseConfig";
import { async } from "@firebase/util";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function HomePage() {
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

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    let isProductAlredayAddedToCart = false;
    isProductAlredayAddedToCart = cartItems.filter(
      (cartItem) => cartItem.id === product.id
    ).length;

    if (isProductAlredayAddedToCart) {
      dispatch({ type: "ADD_QUANTITY", payload: product });
    } else {
      dispatch({ type: "ADD_TO_CART", payload: product });
    }
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
                  <div class="card" onClick={() => {
                      navigate(`/productinfo/${product.id}`);
                    }}>
                    <img
                      src={product.imageURL}
                      class="card-img-top"
                      alt="..."
                      height="220"
                      width="200"
                    />
                    <div class="card-body">
                      <h5 class="card-title">{product.name}</h5>
                      <p class="card-text">₹ <strong>{product.price}</strong></p>
                    </div>
                    </div>

                    <div class="cart">
                      <button
                        type="button"
                        class="btn btn-outline-primary"
                        onClick={() => addToCart(product)}
                      >
                        Add to Cart
                      </button>
                      </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}

export default HomePage;
