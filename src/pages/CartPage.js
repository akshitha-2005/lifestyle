import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../components/Layout";
import { FaTrash } from "react-icons/fa";
import { addDoc, collection } from "firebase/firestore";
import { async } from "@firebase/util";
import firebaseDB from "../firebaseConfig";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";


import StripeCheckout from "react-stripe-checkout";

function CartPage() {
  const { cartItems } = useSelector((state) => state.cartReducer);
  const [totalAmount, setTotalAmount] = useState(0);

  // const [name, setName] = useState("");
  // const [address, setAddress] = useState("");
  // const [city, setCity] = useState("");
  // const [pincode, setPincode] = useState("");
  // const [phoneNumber, setPhoneNumber] = useState("");

  const initialValues = {
    name: "",
    address: "",
    city: "",
    pincode: "",
    number: "",
  };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };

  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    

    if (!values.name) {
      errors.name = "Name is required!";
    }
    if (!values.address) {
      errors.address = "Address is required!";
    }
    if (!values.city) {
      errors.city = "City is required!";
    }
    if (!values.pincode) {
      errors.pincode = "Pincode is required!";
    } else if (values.pincode.length > 6) {
      errors.pincode = "Pincode cannot exceed more than 6 digits"
    }
    if (!values.number) {
      errors.number = "Phone number is required!";
    } else if (values.number.length < 10) {
      errors.number = "Phone number must be 10 digits";
    } else if (values.number.length > 10) {
      errors.number = "Phone number cannot exceed more than 10 digits";
    }

    return errors;
  };

  const onToken = (token) => {
    console.log(token);
  };

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

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
        <Button variant="contained" color="success">
          Total Amount = Rs.{totalAmount}
        </Button>
      </div>

      <div className="d-flex justify-content-end mt-3">
        <button
          type="button"
          class="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
        >
          Proceed to Buy
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
                <form onSubmit={handleSubmit}>
                  <input
                    type="text"
                    className="form-control"
                    name="name"
                    placeholder="Name"
                    value={formValues.name}
                    onChange={handleChange}
                  />
                  <p style={{color:"red"}}>{formErrors.name}</p>

                  <textarea
                    type="text"
                    className="form-control"
                    name="address"
                    placeholder="Address"
                    value={formValues.address}
                    onChange={handleChange}
                  />

                  <p style={{color:"red"}}>{formErrors.address}</p>

                  <input
                    type="text"
                    className="form-control"
                    rows={3}
                    name="city"
                    placeholder="City"
                    value={formValues.city}
                    onChange={handleChange}
                  />

                  <p style={{color:"red"}}>{formErrors.city}</p>

                  <input
                    type="number"
                    className="form-control"
                    name="pincode"
                    placeholder="Pincode"
                    value={formValues.pincode}
                    onChange={handleChange}
                  />

                  <p style={{color:"red"}}>{formErrors.pincode}</p>

                  <input
                    type="number"
                    className="form-control"
                    name="number"
                    placeholder="Number"
                    value={formValues.number}
                    onChange={handleChange}
                  />

                  <p style={{color:"red"}}>{formErrors.number}</p>
               
                  <button type="submit">Deliver to this address </button>
              
                  
        
                </form>
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
             
            </div>
          </div>
        </div>
      </div>

  
    </Layout>
  );
}

export default CartPage;
