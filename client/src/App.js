import React, { createContext, useReducer, useMemo } from 'react';

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

/* 
- [ ] - verify the email address when user is clicking the link by admin operation
- [ ] - add name and other attributes
- [ ] - save additional attributes like name, city in mongoDB
  - seperate collections database for vendor & user
- user attr
*/
const initialState = {
  email: "",
  role: ""
}

export const ACTIONS = {
  LOGIN_SUCCESS: 'login_success',
  LOGIN_ERROR: 'login_error',
  LOGOUT: 'logout',
  LOADING: 'loading'
  // INCREASE: 'increase',
  // DECREASE: 'decrease'
}

const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.LOGIN_SUCCESS:
      return {
        value: state.value + 1
      };
    case ACTIONS.DECREASE:
      return {
        value: state.value - 1
      };
    default:
      return state;
  }
}

// export const AuthContext = createContext();

export const DispatchContext = createContext();
export const StateContext = createContext();

function App() {

  const [state, dispatch] = useReducer(reducer, initialState);

  // const contextValue = useMemo(() => {
  //   return { state, dispatch };
  // }, [state, dispatch]);

  // const myNumber = 10;

  return (
      <div className="App">
        <StateContext.Provider value={{state}}>
          <DispatchContext.Provider value={{dispatch}}>
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
          </DispatchContext.Provider>
        </StateContext.Provider>
    </div>
  );
}

/*
import React, { useReducer } from "react";
 
let user = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).user
  : "";
let token = localStorage.getItem("currentUser")
  ? JSON.parse(localStorage.getItem("currentUser")).auth_token
  : "";
 
export const initialState = {
  userDetails: "" || user,
  token: "" || token,
  loading: false,
  errorMessage: null
};
 
export const AuthReducer = (initialState, action) => {
  switch (action.type) {
    case "REQUEST_LOGIN":
      return {
        ...initialState,
        loading: true
      };
    case "LOGIN_SUCCESS":
      return {
        ...initialState,
        user: action.payload.user,
        token: action.payload.auth_token,
        loading: false
      };
    case "LOGOUT":
      return {
        ...initialState,
        user: "",
        token: ""
      };
 
    case "LOGIN_ERROR":
      return {
        ...initialState,
        loading: false,
        errorMessage: action.error
      };
 
    default:
      throw new Error(`Unhandled action type: ${action.type}`);
  }
};
*/ 

export default App;
