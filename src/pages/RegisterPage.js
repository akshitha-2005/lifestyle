import React, { useState } from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Loader from '../components/Loader';
import { toast } from "react-toastify";
import firebaseDB from "../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";

function RegisterPage() {
  const [name,setName ] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = getAuth();

const addUserData = async() =>{
       const user = {name,email}
            try{
                await addDoc(collection(firebaseDB,"users"),user);
            }catch(error){
                console.log(error);
            }
        
    }
  const register=async() => {
    try {
      setLoading(true)
      const result = await createUserWithEmailAndPassword(auth,email,password)
      console.log(result)
      setLoading(false)
      toast.success('Registration successfull')
      addUserData()
      setName('')
      setEmail('')
      setPassword('')
      setCPassword('')
    } catch (error) {
      console.log(error)
      toast.error('Registration failed')
      setLoading(false)
    }
  }
  return (
    <div className="register-parent">
      {loading && (<Loader />)}
      <div className="register-top">

      </div>
      <div className="row justify-content-center">
        <div className="col-md-5">
          <lottie-player
            src="https://assets7.lottiefiles.com/packages/lf20_6wutsrox.json"
            background="transparent"
            speed="1"
            // style="width: 300px; height: 300px;"
            loop
            autoplay
          ></lottie-player>
        </div>
        <div className="col-md-4 z1">
          <div className="register-form">
            <h2>Sign up</h2>

            <hr />

            
            <input
              type="text"
              required
              className="form-control"
              placeholder="Name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />

            <input
              type="text"
              required
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="password"
              required
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
            <input
              type="password"
              required
              className="form-control"
              placeholder="Confirm Password"
              value={cpassword}
              onChange={(e) => {
                setCPassword(e.target.value);
              }}
            />

            <Button className="my-3" variant="contained" color="success" onClick={register}>
              REGISTER
            </Button>
            <hr />
            <Link to='/login' className="btn btn-primary">Click Here To Login</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
