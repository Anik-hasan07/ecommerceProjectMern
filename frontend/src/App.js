import { useEffect, useState } from "react";
import './App.css';
import Header from "./component/layout/Header/Header.js"
import Footer from "./component/layout/Footer/Footer.js"
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
// import WebFont from "webfontloader";
import React from 'react';
import Home from './component/Home/Home';

import ProductDetails from './component/Product/ProductDetails';
import Products from './component/Product/Products';
import Search from './component/Product/Search';
import LoginSignUp from './component/User/LoginSignUp';
import store from "./store";
import axios from "axios";
import { loadUser } from './actions/userAction';
import UserOptions from "./component/layout/Header/UserOptions";
import { useSelector } from "react-redux";
import Profile from "./component/User/Profile";
// import PrivateRoute from "./component/Route/PrivateRoute";
import Cart from "./component/Cart/Cart";
import PrivateOutlet from "./component/Route/PrivateOutlet";
import UpdateProfile from "./component/User/UpdateProfile";
import UpdatePassword from "./component/User/UpdatePassword";
import ForgotPassword from "./component/User/ForgotPassword";
import ResetPassword from "./component/User/ResetPassword";
import Shipping from "./component/Cart/Shipping";
import ConfirmOrder from "./component/Cart/ConfirmOrder";
import Payment from "./component/Cart/Payment";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";


import OrderSuccess from "./component/Cart/OrderSuccess";
import Dashboard from "./component/Admin/Dashboard";
import MyOrders from "./component/Order/MyOrders";
import OrderDetails from "./component/Order/OrderDetails";
import ProductList from "./component/Admin/ProductList";
import NewProduct from "./component/Admin/NewProduct";
import UpdateProduct from "./component/Admin/UpdateProduct";
import OrderList from "./component/Admin/OrderList";
import ProcessOrder from "./component/Admin/ProcessOrder";
import UsersList from "./component/Admin/UsersList";
import UpdateUser from "./component/Admin/UpdateUser";
import ProductReviews from "./component/Admin/ProductReviews";
import Contact from "./component/layout/Contact/Contact";
import About from "./component/layout/About/About";
import NotFound from "./component/layout/NotFound/NotFound";






function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [stripApikey, setStripeApiKey] = useState(""); 

  async function getStripeApiKey() {
    const { data } = await axios.get("/api/v1/stripeapikey");

    setStripeApiKey(data.stripeApiKey);
  }

  useEffect(()=>{

    // WebFont.load({
    //   google:{
    //     families: ["Roboto", "Droid Sans", "Chilanka"],

    //   },
    // }),
    store.dispatch(loadUser());
    getStripeApiKey();


  },[]);
  // window.addEventListener("contextmenu", (e) => e.preventDefault());

  return (
    
      <Router>
      <Header/>


      {isAuthenticated && <UserOptions user={user} />}

{/* {stripeApiKey && (
  <Elements stripe={loadStripe(stripeApiKey)}>
    <ProtectedRoute exact path="/process/payment" component={Payment} />
  </Elements>
)} */}





      <Routes>
      <Route  path="/" element = {<Home/>}/>
      <Route  path="/product/:id" element = {<ProductDetails/>}/>
      <Route  path="/products" element = {<Products/>}/>
      <Route  path="/products/:keyword" element = {<Products/>}/>

      <Route  path="/search" element = {<Search/>}/>
      <Route  path="/contact" element = {<Contact/>}/>
      <Route  path="/about" element = {<About/>}/>
      {/* <PrivateRoute exact path="/account" element = {<Profile/>}/> */}
      {/* <Route exact path="/account" element={<PrivateRoute><Profile /></PrivateRoute>} /> */}

      {/* <Route  path='/*' element={<PrivateRoute/>}> */}


      {/* <Route  path='/*' element={<PrivateRoute loading={true}/>}>

            <Route  path='account' element={<Profile/>}/>
      </Route> */}



      {/* private route area----------------------private------------ */}
      

      <Route path="/*" element={<PrivateOutlet/>}>
        <Route path="account" element={<Profile/>}/>
        <Route path="me/update" element={<UpdateProfile/>}/>
        <Route path="password/update" element={<UpdatePassword/>}/>
        <Route path="shipping" element={<Shipping/>}/>
        <Route path="order/confirm" element={<ConfirmOrder/>}/>
        {/* <Route path="process/payment" element={<Payment/>}/> */}


        {/* {stripeApiKey && (
        <Elements stripe={loadStripe(stripeApiKey)}>
        <Route  path="process/payment" element={Payment} />
        </Elements>
        
          )} */}

    <Route
      path="process/payment"
      element={
    
      <Elements stripe={loadStripe(stripApikey)} >   
        <Payment/>
      </Elements>
      
    
  }
/>

      {/* <Route  path="process/payment" element={Payment} /> */}

      <Route path="success" element={<OrderSuccess/>}/>
      <Route path="orders" element={<MyOrders/>}/>
      <Route path="order/:id" element={<OrderDetails/>}/>


      <Route path="admin/dashboard" element={<Dashboard/>}/>
      <Route path="admin/products" element={<ProductList/>}/>
      <Route path="admin/product" element={<NewProduct/>}/>
      <Route path="admin/product/:id" element={<UpdateProduct/>}/>
      <Route path="admin/orders" element={<OrderList/>}/>
      <Route path="admin/order/:id" element={<ProcessOrder/>}/>
      <Route path="admin/users" element={<UsersList/>}/>
      <Route path="admin/user/:id" element={<UpdateUser/>}/>
      <Route path="admin/reviews" element={<ProductReviews/>}/>


       

      </Route>


      {/* private route end...................admin */}

      <Route exact path="/login" element = {<LoginSignUp/>}/>
      <Route path="/password/forgot" element={<ForgotPassword/>}/>
      <Route path="/password/reset/:token" element={<ResetPassword/>}/>
      <Route exact path="/cart" element = {<Cart/>}/>
      {/* <Route path="#" element = {<NotFound/>}/> */}
    

      </Routes>
      
      <Footer/>

      </Router>
      

   
 
  );
}

export default App;




//15:31:45