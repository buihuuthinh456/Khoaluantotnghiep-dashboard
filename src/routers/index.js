import React from 'react'
import User from '../pages/User'
import Login from '../pages/Login'
import Register from '../pages/Register'
import Product from '../pages/Products'
import DetailProduct from '../pages/DetailProduct'
import Categories from '../pages/Categories'
import Home from '../pages/Home'


// function index() {
//   return (
//     <Routes>
//       <Route path="/" element={<User />}></Route>
//       <Route path="/login" element={<Login />}></Route>
//       <Route path="/register" element={<Register />}></Route>
//       <Route path="/products" element={<Product />}></Route>  
//       <Route path='/products/:productID' element={<DetailProduct/>} ></Route>
//       <Route path='/category' element={<Categories/>}/>
//     </Routes>
//   )
// }

// export default index

const publicRoutes = [
  {path: '/', component: User },
  {path: '/login', component: Login },
  {path: '/register', component: Register },
  {path: '/products', component: Product },
  {path: '/products/:productID', component: DetailProduct },
  {path: '/category', component: Categories },
]

export { publicRoutes }

