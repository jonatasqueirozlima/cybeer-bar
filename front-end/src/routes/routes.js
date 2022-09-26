import React from 'react';
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';
import ShoppingCartProvider from '../contexts/ShoppingCartProvider.context';
import Login from '../pages/Login';
import Register from '../pages/Register';
import CostumerProducts from '../pages/CostumerProducts.pages';
import CustomerCheckout from '../pages/Checkout';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={ <Navigate to="/login" /> } exact path="/" />
        <Route element={ <Login /> } path="/login" />
        <Route element={ <Register /> } path="/register" />
        <Route
          path="/customer/products"
          element={
            <ShoppingCartProvider>
              <CostumerProducts />
            </ShoppingCartProvider>
          }
        />
        <Route
          path="/customer/checkout"
          element={
            <ShoppingCartProvider>
              <CustomerCheckout />
            </ShoppingCartProvider>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default Router;
