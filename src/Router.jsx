import {CheckoutProvider} from '@stripe/react-stripe-js/checkout';
import {loadStripe} from '@stripe/stripe-js';

import { Elements } from '@stripe/react-stripe-js';

const stripePromise = loadStripe('pk_test_51TAd4aJCuBtHvOdAqeB9weQ7ld09ktdIqFE9zRoozu0F0R1dGLl2s0FxXfEmWtcSfF9s0qRFWdLn343rZjPvZUNv00jAxGQuKp');


import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router'
import Landing from './Pages/Landing/Landing'
import Auth from './Pages/Auth/Auth'
import Payment from './Pages/Payment/Payment'
import Orders from './Pages/Orders/Orders'
import Cart from './Pages/Cart/Cart'
import Result from './Pages/Result/Result'
import ProductDetail from './Pages/ProductDetail/ProductDetail'
import Unknownpage from './Component/Unknownpage/Unknownpage'
import ProtectedRoute from './Component/ProtectedRoute/ProtectedRoute'

function Routing() {
  return (
    <Router>
      <Routes> 
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route
         path="/payment"
          element={
            <ProtectedRoute msg="You must be logged in to access the payment page" redirect="/payment">
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </ProtectedRoute>
          } />
        <Route path="/orders" element={
          <ProtectedRoute msg="You must be logged in to access the orders page" redirect="/orders">
              <Elements stripe={stripePromise}>
                <Orders />
              </Elements>
            </ProtectedRoute>} />
        <Route path="/cart" element={<Cart />} /> 
        <Route path="/category/:categoryName" element={<Result />} /> 
        <Route path="/product/:productId" element={<ProductDetail />} />  
        <Route path="*" element={<Unknownpage/> } />         


      </Routes>
    </Router>
  )
}

export default Routing
