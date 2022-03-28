import React from "react";
import Layout from "../components/Layout";
import { collection, addDoc, getDocs } from 'firebase/firestore';
import firebaseDB from '../firebaseConfig';
import { SHOP_DATA } from "../shop-data";
import { async } from "@firebase/util";

function HomePage() {

    async function getData() {
        try {
            const users = await getDocs(collection(firebaseDB,"products"));
            const productsArray = [];
            users.forEach((doc) => {
                const obj = {
                    id: doc.id,
                    ...doc.data(),
                };

                productsArray.push(obj);
            });
        } catch(error){
            console.log(error);
        }
    }



//     function addProductsData(){
//     SHOP_DATA.map(async (product) =>{
//         try{
//             await addDoc(collection(firebaseDB,"products"),product);
//         }catch(error){
//             console.log(error);
//         }
//     })
// }


    return(
        <Layout>
            <h1>Home</h1>
  
            {/* <button onClick={addProductsData}>add data to firebase</button> */}

        </Layout>
    )
}

export default HomePage;