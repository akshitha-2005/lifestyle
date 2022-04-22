import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import firebaseDB from "../firebaseConfig";
import { getDocs, collection, getDoc, doc, query, where } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { async } from "@firebase/util";



function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const params = useParams();

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
       <div className="">
         <div className="card-header">
            <h4>Order Details</h4>
       </div>
       {orders.map((order) => {
          
        return (
         
          <table className="table mt-3 order">
            
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
                    {/* <td>{item.id}</td> */}
                    <td>
                      <img src={item.imageURL} height="50" width="50" />
                    </td>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price}</td>
                    <td>{totalCartPrice}</td>
             
                  </tr>
                );
              })}
              {order.userid}
            </tbody>
         
          </table>
        )
      })}
      </div>
    </Layout>
  );
}

export default OrdersPage;

