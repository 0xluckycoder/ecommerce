import React, { createContext, useReducer, useMemo, useEffect } from 'react';

import './app.scss';
import 'antd/dist/antd.css';

import { Routes, Route, useNavigate, useLocation, Navigate } from 'react-router-dom';

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

const authState = {
  isAuthenticated: false,
  email: "",
  role: ""
}

export const ACTIONS = {
  LOGIN_SUCCESS: 'login_success',
  LOGIN_ERROR: 'login_error',
  LOGOUT: 'logout',
  LOADING: 'loading'
}

// accept the payload
const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.LOGIN_SUCCESS:
      return {
        email: action.payload.email,
        role: action.payload.role
      };
    case ACTIONS.LOGIN_ERROR:
      return {
        email: "",
        role: ""
      };
    default:
      return state;
  }
}

export const DispatchContext = createContext();
export const StateContext = createContext();

function App() {

  const [state, dispatch] = useReducer(reducer, authState);

  /*
  - [ ] - add the loading while authenticating
  */

  useEffect(() => {
   (async () => {
      try {
        const response = await fetch('http://localhost:5500/api/user/verifyAuth', {
          method: 'GET',
          credentials: "include",
        });
        const data = await response.json();
        console.log(data);

        dispatch({ 
          type: ACTIONS.LOGIN_SUCCESS, 
          payload: {
              email: data.userData.email,
              role: data.userData.role
        }});

      } catch(error) {
        console.log('error', error);
        dispatch({ type: ACTIONS.LOGIN_ERROR });
      }
   })()

  }, []);

  // const contextValue = useMemo(() => {
  //   return { state, dispatch };
  // }, [state, dispatch]);

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

function Protected({ children, authState, permissionRole }) {
  
  if (!authState.isAuthenticated || !authState.role === permissionRole) {
    return <Navigate to="/" replace />
  }

  return children;
}

export default App;
