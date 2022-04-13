import React, { useState } from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { toast } from "react-toastify";
import Loader from "../components/Loader";
import {
  signInAuthUserWithEmailAndPassword,
  signInWithGoogle,
  signInWithGooglePopup
} from "../firebaseConfig";


function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const auth = getAuth();

  const signInWithGoogle = async () => {
    await signInWithGooglePopup();
    const res = await signInAuthUserWithEmailAndPassword(auth, email, password);
    window.location.href = "/home";
  };


  const login = async () => {
    try {
      setLoading(true);
      const result = await signInWithEmailAndPassword(auth, email, password);
      
 
      localStorage.setItem("currentUser", JSON.stringify(result));
      setLoading(false);
      
      toast.success("Login successfull");
      window.location.href = "/home";
    } catch (error) {
      console.log(error);
      toast.error("Login failed");
      setLoading(false);
    }
  };

  return (
    <div className="login-parent">
      {loading && <Loader />}
      <div className="row justify-content-center">
        <div className="col-md-4 z1">
          <div className="login-form">
            <h2>Login</h2>

            <hr />

            <input
              type="text"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />

            <Button
              className="my-3"
              variant="contained"
              color="success"
              onClick={login}
            >
              LOGIN
            </Button>
            <hr />
           

            <Button variant="contained" onClick={signInWithGoogle}>Sign in with Google</Button>
          </div>
        </div>

        <div className="col-md-5 z1">
          <lottie-player
            src="https://assets7.lottiefiles.com/packages/lf20_6wutsrox.json"
            background="transparent"
            speed="1"
            // style="width: 300px; height: 300px;"
            loop
            autoplay
          ></lottie-player>
        </div>
      </div>
      <div className="login-bottom"></div>
    </div>
  );
}

export default LoginPage;
