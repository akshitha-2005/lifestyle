import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import firebaseDB from "../firebaseConfig";
import { getDocs, collection } from "firebase/firestore";

function OrdersPage() {
  
  
  return (
     <Layout>
      <h1>YOUR ORDERS</h1>
    </Layout>
  );
}

export default OrdersPage;
