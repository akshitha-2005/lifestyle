import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import Loader from '../components/Loader';
import { toast } from "react-toastify";
import firebaseDB from "../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

function RegisterPage() {
  const initialValues = { username: "", email: "", password: "" };
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const auth = getAuth();

  const addUserData = async() =>{
    const user = {formValues}
         try{
             await addDoc(collection(firebaseDB,"users"),user);
         }catch(error){
             console.log(error);
         }
     
 }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };



  useEffect(() => {
    console.log(formErrors);
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValues);
    }
  }, [formErrors]);
  const validate = (values) => {
    const errors = {};
    const regexName = /^[آ-یA-z]{2,}( [آ-یA-z]{1,})+([آ-یA-z]|[ ]?)$/;
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.username) {
      errors.username = "Full Name is required!";
    } else if (!regexName.test(values.username)){
        errors.username = "Invalid full name!"
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "Invalid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 5) {
      errors.password = "Password must be more than 5 characters";
    } else if (values.password.length > 15) {
      errors.password = "Password cannot exceed more than 15 characters";
    }
    return errors;
  };

  const handleSubmit=async(e) => {
      e.preventDefault();
      setFormErrors(validate(formValues));
    try {
      setLoading(true)
      const result = await createUserWithEmailAndPassword(auth,formValues.email,formValues.password);
      console.log(result)
      setLoading(false)
      setIsSubmit(true);
      toast.success('Registered successfully!')
      addUserData()
    } catch (error) {
      console.log(error)
      toast.error('Registration failed!')
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
          loop
          autoplay
        ></lottie-player>
      </div>
      <div className="col-md-4 z1">
        <div className="register-form">
          <h2>Register</h2>
          <hr />
            <input
              type="text"
              name="username"
              className="form-control"
              placeholder="Name"
              value={formValues.username}
              onChange={handleChange}
            />
    
          <p style={{ color: "red" }}>{formErrors.username}</p>

            <input
              type="email"
              name="email"
              className="form-control"
              placeholder="Email"
              value={formValues.email}
              onChange={handleChange}
            />
          
          <p style={{ color: "red" }}>{formErrors.email}</p>
           
            <input
              type="password"
              name="password"
              className="form-control"
              placeholder="Password"
              value={formValues.password}
              onChange={handleChange}
            />
          <p style={{ color: "red" }}>{formErrors.password}</p>
          <Button className="my-3" variant="contained" color="success" onClick={handleSubmit}>
              REGISTER
            </Button>
            <hr />
            <p>Already have an account?</p>
            <Link to='/login' className="btn btn-primary">Login</Link>
        </div>
     </div>
     </div>
     </div>
    
  );
}

export default RegisterPage;
