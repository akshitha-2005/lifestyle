import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import firebaseDB from "../firebaseConfig";
import { getDocs, collection, getDoc, doc } from "firebase/firestore";
import { useParams } from "react-router-dom";



function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const params = useParams();

  useEffect(() => {
    getData();
  }, []);

  var totalCartPrice = 0;

  async function getData() {
    try {
      setLoading(true);
      const orderTemp = await getDoc(
        doc(firebaseDB, "orders", params.ordersid)
      );

      setOrders(orderTemp.data());
      console.log(orderTemp);
      setLoading(false)
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  
  async function getData() {
    try {
      setLoading(true);
      const result = await getDocs(collection(firebaseDB, "orders"));
      const ordersArray = [];
      result.forEach((doc) => {
        ordersArray.push(doc.data());
        setLoading(false);
      });
      console.log(ordersArray);
      setOrders(ordersArray);
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
                <th>Order #</th>
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
                    <td>{item.id}</td>
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
            </tbody>
         
          </table>
        )
      })}
      </div>
    </Layout>
  );
}

export default OrdersPage;

