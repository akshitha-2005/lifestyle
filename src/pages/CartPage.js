import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Layout from "../components/Layout";
import { FaTrash } from "react-icons/fa";
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { async } from "@firebase/util";
import firebaseDB from "../firebaseConfig";
import { toast } from "react-toastify";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import StripeCheckout from "react-stripe-checkout";
import { useNavigate } from "react-router-dom";

function CartPage() {
  const { cartItems } = useSelector((state) => state.cartReducer);
  const navigate = useNavigate();
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
  // This is sort of a hack to display Pay With Card button for valid inputs only
  const [showPayWithCard, setShowPayWithCard] = useState(false);

  const handleChange = (e) => {
    setShowPayWithCard(false);
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
      setShowPayWithCard(true);
    }
  }, [formErrors]);

  const validate = (values) => {
    const errors = {};
    const regex = /^[آ-یA-z]{2,}( [آ-یA-z]{1,})+([آ-یA-z]|[ ]?)$/;
    const regexCity = /^[a-zA-Z\- ]+$/;

    if (!values.name?.trim()) {
      errors.name = "Full Name is required!";
    } else if (!regex.test(values.name)) {
      errors.name = "Invalid full name!";
    }
    if (!values.address?.trim()) {
      errors.address = "Address is required!";
    }
    if (!values.city?.trim()) {
      errors.city = "City is required!";
    } else if (!regexCity.test(values.city)){
      errors.city = "Invalid city name!";
    }
    if (!values.pincode?.trim()) {
      errors.pincode = "Pincode is required!";
    } else if (values.pincode.length !== 6) {
      errors.pincode = "Pincode must be of 6 digits";
    }
    if (!values.number?.trim()) {
      errors.number = "Phone number is required!";
    } else if (values.number.length !== 10) {
      errors.number = "Phone number must be of 10 digits";
    }

    return errors;
  };

  const onToken = (token) => {
    console.log(token);
  };

  var totalCartPrice = 0;

  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);

  // useEffect(() => {
  //   let temp = 0;
  //   cartItems.forEach((cartItem) => {
  //     temp = temp + cartItem.price;
  //   });
  //   setTotalAmount(temp);
  // }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("formValues", JSON.stringify(formValues));
  }, [formValues]);

  const deleteFromCart = (product) => {
    dispatch({ type: "DELETE_FROM_CART", payload: product });
  };

  const addQuantity = (product) => {
    dispatch({ type: "ADD_QUANTITY", payload: product });
  };

  const subtractQuantity = (product) => {
    dispatch({ type: "SUB_QUANTITY", payload: product });
  };

  const clearCart = (product) => {
    dispatch({ type: "CLEAR_CART", payload: product });
  };

  const params = useParams();

  const placeOrder = async () => {
    const { name, address, city, pincode, number } = formValues;
    console.log(formValues);

    const orderInfo = {
      cartItems,
      formValues,
      email: JSON.parse(localStorage.getItem("currentUser")).user.email,
      userid: JSON.parse(localStorage.getItem("currentUser")).user.uid,
    };

    try {
      setLoading(true);
      const result = await addDoc(collection(firebaseDB, "orders"), orderInfo);
      setLoading(false);
      toast.success("Order placed successfully");
      clearCart();
      // window.location.href = "/home";
    } catch (error) {
      setLoading(false);
      toast.error("Order failed");
    }
  };

  return (
    <Layout loading={loading}>
      <table className='table mt-3'>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {cartItems.map((item) => {
            totalCartPrice += item.price * item.quantity;
            return (
              <tr>
                <td>
                  <img src={item.imageURL} height='80' width='80' />
                </td>

                <td>{item.name}</td>
                <td>₹ {item.price}</td>
                <td>
                  <div className='input-group'>
                    <button
                      onClick={() => subtractQuantity(item)}
                      disabled={item.quantity < 2}
                    >
                      -
                    </button>
                    &nbsp;&nbsp;
                    <button>{item.quantity}</button>
                    &nbsp;&nbsp;
                    <button onClick={() => addQuantity(item)}>+</button>
                  </div>
                </td>

                <td>
                  <FaTrash onClick={() => deleteFromCart(item)} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {totalCartPrice > 0 ? (
        <>
          <div className='d-flex justify-content-end p-4'>
              <div class="card-title total-amount">
              <h5><strong>Total Price = ₹  {totalCartPrice}</strong></h5> 
              </div>
          </div>
          <div className='d-flex justify-content-end p-4'>
            <button
              type='button'
              class='btn btn-success'
              data-bs-toggle='modal'
              data-bs-target='#exampleModal'
              disabled={totalCartPrice < 1}
              >
              Place Order
            </button>
          </div>
        </>
      ) : (
        <>
          <h3 className='d-flex justify-content-center mt-3'>
            No Items in cart
          </h3>
          <div className='d-flex justify-content-center mt-3'>
            <button
              type='button'
              class='btn btn-success'
              onClick={() => navigate("/home")}
            >
              Start Adding
            </button>
          </div>
        </>
      )}
      <div
        class='modal fade'
        id='exampleModal'
        tabindex='-1'
        aria-labelledby='exampleModalLabel'
        aria-hidden='true'
      >
        <div class='modal-dialog'>
          <div class='modal-content'>
            <div class='modal-header'>
              <h5 class='modal-title' id='exampleModalLabel'>
                Shipping Address
              </h5>
              <button
                type='button'
                class='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div class='modal-body'>
              <div className='register-form'>
                <input
                  type='text'
                  className='form-control'
                  name='name'
                  placeholder='Name'
                  value={formValues.name}
                  onChange={handleChange}
                />
                <p style={{ color: "red" }}>{formErrors.name}</p>

                <textarea
                  type='text'
                  className='form-control'
                  name='address'
                  placeholder='Address'
                  value={formValues.address}
                  onChange={handleChange}
                />

                <p style={{ color: "red" }}>{formErrors.address}</p>

                <input
                  type='text'
                  className='form-control'
                  rows={3}
                  name='city'
                  placeholder='City'
                  value={formValues.city}
                  onChange={handleChange}
                />

                <p style={{ color: "red" }}>{formErrors.city}</p>

                <input
                  type='number'
                  className='form-control'
                  name='pincode'
                  placeholder='Pincode'
                  value={formValues.pincode}
                  onChange={handleChange}
                />

                <p style={{ color: "red" }}>{formErrors.pincode}</p>

                <input
                  type='number'
                  className='form-control'
                  name='number'
                  placeholder='Number'
                  value={formValues.number}
                  onChange={handleChange}
                />

                <p style={{ color: "red" }}>{formErrors.number}</p>
              
                {showPayWithCard ? (
                    <Button variant="text"  data-bs-dismiss='modal'>
                  <StripeCheckout
                    onClick={handleSubmit}
                    token={placeOrder}
                    allowRememberMe
                    name='Please provide your details'
                    currency='INR'
                    amount={totalCartPrice * 100}
                    stripeKey='pk_test_51KhBC0SAPA9SMMhz607kt3WuhuFUrgG5Vc0eluvmaOI4gdytTNaxmFYcshefxmoPf6qkHRCrsrHEExBFu8hcUdon00I7XUWZuI'
                  />
                  </Button>
                ) : (
                 
                  <Button type='submit' variant='text' onClick={handleSubmit}>
                    Deliver to this address
                  </Button>
                )}
              
                 
              </div>
            </div>
            <div class='modal-footer'>
              <button
                type='button'
                class='btn btn-secondary'
                data-bs-dismiss='modal'
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
