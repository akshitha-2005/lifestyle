import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import firebaseDB from "../firebaseConfig";
import { getDocs, collection } from "firebase/firestore";


function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = JSON.parse(localStorage.getItem("currentUser"));


  useEffect(() => {
    getData();
  }, []);

  var totalCartPrice = 0;

 async function getData(){
   try{
     setLoading(true);
    const querySnapshot = await getDocs(collection(firebaseDB,"orders"));
    querySnapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
      const ordersArray = [];
      querySnapshot.forEach((doc) => {
        const obj = {
          id: doc.id,
          ...doc.data(),
        };
        ordersArray.push(obj);
        setLoading(false);
      })
      console.log(ordersArray);
      setOrders(ordersArray);
    });
   } catch (error) {
        console.log(error);
        setLoading(false);
   }
 }
 
  return (
     <Layout loading={loading}>
       {/* <div className=""> */}
         <div className="card-title order-details">
            <h4><strong>Order Details</strong></h4>
       </div>
       {orders.filter(order => order.userid === user.uid).map((order) => {
          
        return (
         
          <table class="table mt-3 order">
            
            <thead>
              
                <tr>
                <th>Order #{order.id}</th>
                </tr>
               <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Order total</th>
               
              </tr>
            </thead>
            <tbody>
              {order.cartItems.map((item) => {
                  totalCartPrice = item.price * item.quantity;
                return (
                  <tr>
                    <td>
                      <img src={item.imageURL} height="50" width="50" />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>₹ {item.price}</td>
                    <td>₹ {totalCartPrice}</td>
      
                  </tr>
                );
              })}
            </tbody>
         
          </table>

          
        )
      })}
      {/* </div> */}
    </Layout>
  );
}

export default OrdersPage;

