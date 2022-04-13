import React from 'react'
import User from '../pages/User'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Product from '../pages/Products'
import DetailProduct from '../pages/DetailProduct'
import {
  Routes,
  Route,
} from "react-router-dom";

function index() {
  return (
    <Routes>
      <Route path="/" element={<User />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/products" element={<Product />}></Route>  
      <Route path='/products/:productID' element={<DetailProduct/>} ></Route>
    </Routes>
  )
}

export default index

