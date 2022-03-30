import logo from './logo.svg';
import './App.css';
import HomePage from './pages/HomePage';
import { Route, BrowserRouter, Routes} from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ProductInfo from './pages/ProductInfo';
import CartPage from './pages/CartPage';

import './stylesheets/layout.css';
import './stylesheets/products.css';
import './stylesheets/authentication.css';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <Routes>

            <Route path='/' exact element={<HomePage />} />
            <Route path='/login' exact element={<LoginPage />} />
            <Route path='/register' exact element={<RegisterPage />} />
            <Route path='/productinfo/:productid' exact element={<ProductInfo />} />
            <Route path='/cart' exact element={<CartPage />} />

          </Routes>
      
      </BrowserRouter>
      
      
    </div>
  );
}

export default App;
