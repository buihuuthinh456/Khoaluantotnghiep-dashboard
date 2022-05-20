import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import loginReducer from '../features/login/loginSlice';
import productsReducer from '../features/products/productsSlice';
import detailProductReducer from '../features/detailProduct/detailProductSlice';
import usersReducer from '../features/users/usersSlice';
import categoriesReducer from '../features/categories/categoriesSlice';
import ordersReducer from '../features/orders/ordersSlice';


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    login:loginReducer,
    products:productsReducer,
    detailProduct:detailProductReducer,
    users:usersReducer,
    categories:categoriesReducer,
    orders:ordersReducer,
  },
});
