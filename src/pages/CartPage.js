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
 
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [pincode, setPincode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
 
 
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

  const placeOrder = async() => {
    const addressInfo = {
      name,
      address,
      city,
      pincode,
      phoneNumber
    }
    console.log(addressInfo);
  }

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
        
        <Button variant="contained" color="success">Total Amount = Rs.{totalAmount}</Button>
      </div>
     
      <div className="d-flex justify-content-end mt-3">
      <button
        type="button"
        class="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        PLACE ORDER
      </button>
      </div>
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">
                Shipping Address
              </h5>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">

            <div className="register-form">

            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
              required
            />
            <textarea
              type="text"
              className="form-control"
              rows={3}
              placeholder="Address"
              value={address}
              onChange={(e) => {
                setAddress(e.target.value);
              }}
            />
            <input
              type="text"
              className="form-control"
              placeholder="City"
              value={city}
              onChange={(e) => {
                setCity(e.target.value);
              }}
            />
             <input
              type="number"
              className="form-control"
              placeholder="Pincode"
              value={pincode}
              onChange={(e) => {
                setPincode(e.target.value);
              }}
            />
             <input
              type="number"
              className="form-control"
              placeholder="Phone Number"
              value={phoneNumber
              }
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
            />

            </div>

            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button  onClick={placeOrder} type="button" class="btn btn-primary" >
                Proceed
              </button>
            </div>
          </div>
        </div>
      </div>
      
    </Layout>
  );
}

export default CartPage;