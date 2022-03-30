import React, { useState } from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
 
  return (
    <div className="login-parent">
      <div className="row justify-content-center">
      <div className="col-md-4 z1">
          <div className="login-form">
            <h2>Login</h2>

            <hr />

            <input
              type="text"
              className="form-control"
              placeholder="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
            <input
              type="text"
              className="form-control"
              placeholder="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
        
            <Button className="my-3" variant="contained" color="success">
              LOGIN
            </Button>
            <hr />
            <Link to='/register'>Click Here To Register</Link>
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
