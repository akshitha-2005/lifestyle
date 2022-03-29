import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { collection, addDoc, getDocs } from "firebase/firestore";
import firebaseDB from "../firebaseConfig";
import { fireproducts } from "../firecommerce";
import { async } from "@firebase/util";

function HomePage() {
  // async function adddata() {
  //     try{
  //         await addDoc(collection(firebaseDB,"users"),{name: "Akshitha",age:22});
  //     }catch(error){
  //         console.log(error);
  //     }
  // }
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getData();
  }, []);
  async function getData() {
    try {
      const users = await getDocs(collection(firebaseDB, "products"));
      const productsArray = [];
      users.forEach((doc) => {
        const obj = {
          id: doc.id,
          ...doc.data(),
        };

        productsArray.push(obj);
      });
      setProducts(productsArray);
    } catch (error) {
      console.log(error);
    }
  }

  //     function addProductsData(){
  //     fireproducts.map(async (product) =>{
  //         try{
  //             await addDoc(collection(firebaseDB,"products"),product);
  //         }catch(error){
  //             console.log(error);
  //         }
  //     })
  // }

  return (
    <Layout>
      <div className="container">
        <div className="row">
          {products.map((product) => {
            return (
              <div className="col-md-4">
                <div className="m-2 p-1 product position-relative">
                  <div className="product-content">
                    <p>{product.name}</p>
                    <div className="text-center">
                      <img
                        src={product.imageURL}
                        alt=""
                        className="product-img"
                      />
                    </div>
                  </div>
                  <div className="product-actions">
                    <h2>Rs.{product.price}</h2>
                    <div className="d-flex">
                      <button className="mx-2">ADD TO CART</button>
                      <button>VIEW</button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      {/* <button onClick={adddata}>add data</button> */}

      {/* <button onClick={addProductsData}>add data to firebase</button> */}
    </Layout>
  );
}

export default HomePage;
