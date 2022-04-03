import React from 'react'
import Header from '../components/Header'
import Sidebar from '../components/Sidebar'
import User from '../pages/User'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Product from '../pages/Products'
import styled from 'styled-components'

import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import SinglePageProduct from '../components/SinglePageProduct'


function index() {
  return (
    <Routes>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/products" element={<Product />}></Route>
      <Route path="/" element={<User />}></Route>
      <Route path="/SinglePageProduct" element={<SinglePageProduct />}></Route>    
    </Routes>
  )
}

export default index

