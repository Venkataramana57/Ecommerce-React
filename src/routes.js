import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './pages/auth/Signup';
import Login from './pages/auth/Login';
import ProductList from './pages/products/List';
import CreateProduct from './pages/products/Create';
import ProductDetails from './pages/products/Details'
import Cart from './pages/orders/Cart'

const AppRoutes = () => (
  <Router>
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/products" element={<ProductList />} />
      <Route path="/products/new" element={<CreateProduct />} />
      <Route path="/products/:id" element={<ProductDetails />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  </Router>
);

export default AppRoutes;
