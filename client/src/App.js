import React, { createContext, useReducer, useMemo, useEffect } from 'react';

import './app.scss';
import 'antd/dist/antd.css';

import { Routes, Route, useNavigate, useLocation, Navigate, Link } from 'react-router-dom';

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

import Loading from './Components/Loading';
import AccountSetup from './Components/AccountSetup/AccountSetup';

const authState = {
  isLoading: false,
  isAuthenticated: false,
  email: "",
  role: "",
  errorMessage: "",
}

export const ACTIONS = {
  AUTH_SUCCESS: 'auth_success',
  SIGNIN_SUCCESS: 'signin_success',
  SIGNUP_SUCCESS: 'signup_success',
  AUTH_ERROR: 'auth_error',
  LOGOUT: 'logout',
  LOADING: 'loading',
  SIGNIN_ERROR: 'signin_error',
  SIGNUP_ERROR: 'signup_error',
  CLEAR_ERROR: 'clear_error'
}

// accept the payload
const reducer = (state, action) => {
  switch (action.type) {
    case ACTIONS.AUTH_SUCCESS:
    case ACTIONS.SIGNIN_SUCCESS:
      // console.log('loading success');
      return {
        isLoading: false,
        isAuthenticated: true,
        email: action.payload.email,
        role: action.payload.role,
        errorMessage: "",
      };
    case ACTIONS.SIGNUP_SUCCESS:
      return {
        isLoading: false,
        isAuthenticated: false,
        email: "",
        role: "",
        errorMessage: "",
      }
    case ACTIONS.SIGNIN_ERROR:
    case ACTIONS.SIGNUP_ERROR:
      // console.log('loading error')
      return {
        isLoading: false,
        isAuthenticated: false,
        email: "",
        role: "",
        errorMessage: action.payload.errorMessage
      };

    case ACTIONS.AUTH_ERROR:
      return {
        isLoading: false,
        isAuthenticated: false,
        email: "",
        role: "",
        errorMessage: ""
      }
    case ACTIONS.LOADING:
      // console.log('loading')
      return {
        ...authState,
        isLoading: true
      }

    case ACTIONS.STOP_LOADING:
      return {
        ...authState,
        isLoading: false
      }

    case ACTIONS.CLEAR_ERROR:
      return {
        ...authState,
        errorMessage: "",
      }
    // case ACTIONS.STOP_LOADING:
    //   return {
    //     ...authState,
    //     isLoading: false
    //   }
    default:
      // console.log('default')
      return state;
  }
}

export const DispatchContext = createContext();
export const StateContext = createContext();

export const ROUTES = {
  VENDOR_DASHBOARD: '/vendor/dashboard',
  VENDOR_CUSTOMERS: '/vendor/customers',
  VENDOR_ORDERS: '/vendor/orders',
  VENDOR_PRODUCTS: '/vendor/products',
  VENDOR_SETTINGS: '/vendor/settings',
  SIGNIN: '/auth/signin',
  SIGNUP: '/auth/signup',
  CONFIRM_EMAIL: '/auth/confirm-email',
  VENDOR_ACCOUNT_SETUP: '/account-setup'
}

function App() {

  const [state, dispatch] = useReducer(reducer, authState);

  const location = useLocation();
  const navigate = useNavigate();

  /*
  - [ ] - add the loading while authenticating
  */

  const authorizeDirectEnteredLinks = (path, role) => {
    console.log(path, role);

    // vendor allowed routes
    role === 'vendor' && path === ROUTES.VENDOR_DASHBOARD && navigate(ROUTES.VENDOR_DASHBOARD);
    role === 'vendor' && path === ROUTES.VENDOR_CUSTOMERS && navigate(ROUTES.VENDOR_CUSTOMERS);
    role === 'vendor' && path === ROUTES.VENDOR_ORDERS && navigate(ROUTES.VENDOR_ORDERS);
    role === 'vendor' && path === ROUTES.VENDOR_PRODUCTS && navigate(ROUTES.VENDOR_PRODUCTS);
    role === 'vendor' && path === ROUTES.VENDOR_SETTINGS && navigate(ROUTES.VENDOR_SETTINGS);

    // customer allowed routes
  }

  useEffect(() => {
   (async () => {
      try {
        dispatch({ type: ACTIONS.LOADING });

        const response = await fetch('http://localhost:5500/api/v1/auth/verifyAuth', {
          method: 'GET',
          credentials: "include",
        });
        const data = await response.json();
        console.log(data);

        // redirect to account setup if user status is "initial"
        if (data.userData.role === "vendor") {
          const getVendorByUserId = await fetch('http://localhost:5500/api/v1/vendor/user', {
            method: 'GET',
            credentials: "include",
          });
          const getVendorByUserIdData = await getVendorByUserId.json();
          console.log(getVendorByUserIdData);
          
          if (getVendorByUserIdData.data.userStatus === "initial") {
            navigate(ROUTES.VENDOR_ACCOUNT_SETUP)
          } else {
            navigate(ROUTES.VENDOR_DASHBOARD)
          }
      }


      dispatch({ 
        type: ACTIONS.AUTH_SUCCESS, 
        payload: {
            email: data.userData.email,
            role: data.userData.role
      }});
      authorizeDirectEnteredLinks(location.pathname, data.userData.role);

      } catch(error) {
        console.log('error', error);
        dispatch({ type: ACTIONS.AUTH_ERROR });
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
        {state.isLoading ? 
          <Loading />
        :
            <Routes>
              <Route path="vendor" element={
                      <Protected authState={state} permissionRole={"vendor"}>
                        <VendorPage />
                      </Protected>
              }>
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
              <Route path="account-setup" element={
                        <Protected authState={state} permissionRole={"vendor"}>
                          <AccountSetup />
                        </Protected>
              }/>
                        
            </Routes>
        }
        {/* <Loading /> */}
    </DispatchContext.Provider>
    </StateContext.Provider>
    </div>
  );
}

function Protected({ children, authState, permissionRole }) {

  if (authState.isAuthenticated && authState.role === permissionRole) {
    console.log('truthy');
    return children;
  }
  console.log('falsy');
  return <Navigate to="/auth/signin" replace />
}



export default App;
