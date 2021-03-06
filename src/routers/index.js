import React from 'react'
// import User from '../pages/User'
import User from '../pagesSass/User'
import Login from '../pages/Login'
import Register from '../pages/Register'
// import Product from '../pages/Products'
import Product from '../pagesSass/Products'
// import DetailProduct from '../pages/DetailProduct'
import DetailProduct from '../pagesSass/DetailProduct'
// import Categories from '../pages/Categories'
import Categories from '../pagesSass/Categories'
import Home from '../pages/Home'
import Orders from '../pagesSass/Orders'
// import MoreInfoForm from '../components_SASS/MoreInfoForm'
import AddForm from '../components_SASS/AddForm'
import ImgSlider from '../pagesSass/ImgSlider'
import Profile from '../pagesSass/Profile'
import ForgetPassword from '../pagesSass/ForgetPassword'
import ResetPassord from '../pagesSass/ResetPassord'
import Analysis from '../pagesSass/Analysis'


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
  {path: '/orders', component: Orders },
  {path: '/imgSlider', component: ImgSlider },
  {path: '/profile/:userID', component: Profile },
  {path: '/forgetPassWord', component: ForgetPassword},
  {path: '/resetPassword', component: ResetPassord},
  {path: '/analysis', component: Analysis},
]

export { publicRoutes }

