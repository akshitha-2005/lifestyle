import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../components/Layout";
import { FaTrash } from "react-icons/fa";
import { addDoc, collection} from "firebase/firestore";
import { async } from "@firebase/util";
import firebaseDB from "../firebaseConfig";
import { toast } from "react-toastify";
import { Button } from "@mui/material";


function CartPage() {
  const { cartItems} = useSelector((state) => state.cartReducer);
  const [totalAmount, setTotalAmount] = useState(0);


  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let temp = 0;
    cartItems.forEach((cartItem) => {
      temp = temp + cartItem.price;
    });
    setTotalAmount(temp);
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const deleteFromCart = (product) => {
    dispatch({ type: "DELETE_FROM_CART", payload: product });
  };

  return (
    
    <Layout loading={loading}>
      <table className="table mt-3">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => {
            return (
              <tr>
                <td>
                  <img src={item.imageURL} height="80" width="80" />
                </td>

                <td>{item.name}</td>
                <td>{item.price}</td>
                
                <td>
                  <FaTrash onClick={() => deleteFromCart(item)} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="d-flex justify-content-end">
        
        <Button variant="contained">Total Amount = Rs.{totalAmount}</Button>
      </div>
      
    </Layout>
  );
}

export default CartPage;