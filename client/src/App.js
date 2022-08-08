import './app.scss';
import 'antd/dist/antd.css';
// import SellerDashboard from './Components/SellerDashboard';
// import AuthPage from './Components/Auth/AuthPage';

import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

import VendorPage from './Components/VendorPage/VendorPage';
import Home from './Components/VendorPage/Home';
import Customers from './Components/VendorPage/Customers';
import Orders from './Components/VendorPage/Orders';
import Products from './Components/VendorPage/Products';
import Settings from './Components/VendorPage/Settings';

import AuthPage from './Components/Auth/AuthPage';
import SignIn from './Components/Auth/SignIn';
import SignUp from './Components/Auth/SignUp';
import ForgotPassword from './Components/Auth/ForgotPassword';
import ConfirmEmail from './Components/Auth/ConfirmEmail';

function App() {

  return (
    <div className="App">
      <Routes>
        <Route path="vendor" element={<VendorPage />}>
          <Route path="dashboard" element={<Home />} />
          <Route path="customers" element={<Customers />} />
          <Route path="orders" element={<Orders />} />
          <Route path="products" element={<Products />} />
          <Route path="settings" element={<Settings />} />
        </Route>
        <Route path="auth" element={<AuthPage />}>
          <Route path="signin" element={<SignIn />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="signup" element={<SignUp />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="confirm-email" element={<ConfirmEmail />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
