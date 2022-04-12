import React from 'react'
import User from '../pages/User'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Product from '../pages/Products'
import SinglePageProduct from '../components/SinglePageProduct'
import Loading from '../components/Loading'
import {
  Routes,
  Route,
} from "react-router-dom";

function index() {
  return (
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/products" element={<Product />}></Route>
      <Route path="/" element={<User />}></Route>
      <Route path="/SinglePageProduct" element={<SinglePageProduct />}></Route>    
      <Route path='/products/:productID' element={<SinglePageProduct></SinglePageProduct>} ></Route>
    </Routes>
  )
}

export default index

