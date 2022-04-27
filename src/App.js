
import "./App.css";
import HomePage from "./pages/HomePage";
import { Route, BrowserRouter, Routes, Navigate } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProductInfo from "./pages/ProductInfo";
import CartPage from "./pages/CartPage";
import OrdersPage from "./pages/OrdersPage";

import "./stylesheets/layout.css";
import "./stylesheets/products.css";
import "./stylesheets/authentication.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {

  return (
    <div className="App">
      <ToastContainer />
      <BrowserRouter>
        <Routes>
          <Route path="/" exact element={<RegisterPage />} />
          <Route path="/home" exact element={<HomePage />} />
          <Route path="/productinfo/:productid" exact element={<ProductInfo />}/>
          <Route path="/cart" exact element={<CartPage />} />
          <Route path="/orders" exact element={<OrdersPage />} />

          <Route path="/login" exact element={<LoginPage />} />
          
        </Routes>
      </BrowserRouter>
      </div>
  );
}

export default App;

export const ProtectedRoutes = ({ children }) => {
  if (localStorage.getItem.apply("currentUser")) {
    return children;
  } else {
    return <Navigate to="/" />;
  }
};
