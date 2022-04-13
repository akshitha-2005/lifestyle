import React, {useState} from 'react'
import { useSelector } from "react-redux";
import { Button } from '@mui/material';
import firebaseDB from "../firebaseConfig";
import { toast } from "react-toastify";
import { addDoc, collection } from "firebase/firestore";
import StripeCheckout from "react-stripe-checkout";



function PaymentPage() {

    const { cartItems } = useSelector((state) => state.cartReducer);

    const [loading, setLoading] = useState(false);

    const initialValues = {
        name: "",
        address: "",
        city: "",
        pincode: "",
        number: "",
      };
      const [formValues, setFormValues] = useState(initialValues);
  

    const placeOrder = async () => {
        const  {
          name,
          address,
          city,
          pincode,
          number
        } = formValues
        console.log(formValues);
    
        const orderInfo = {
          cartItems,
          // addressInfo,
          email: JSON.parse(localStorage.getItem("currentUser")).user.email,
          userid: JSON.parse(localStorage.getItem("currentUser")).user.uid,
        };
    
        try {
          setLoading(true);
          const result = await addDoc(collection(firebaseDB, "orders"), orderInfo);
          setLoading(false);
          toast.success("Order placed successfully");
        } catch (error) {
          setLoading(false);
          toast.error("Order failed");
        }
      };

  return (
    <div>
      
                  <Button variant="text" type="submit" data-bs-dismiss="modal">
                <StripeCheckout 
                  // token={onToken}
                  token={placeOrder}
                  name="Please provide your details"
                  currency="INR"
                  // amount={totalAmount}
                  stripeKey="pk_test_51KhBC0SAPA9SMMhz607kt3WuhuFUrgG5Vc0eluvmaOI4gdytTNaxmFYcshefxmoPf6qkHRCrsrHEExBFu8hcUdon00I7XUWZuI"
                />
              </Button>
         
    </div>
  )
}

export default PaymentPage