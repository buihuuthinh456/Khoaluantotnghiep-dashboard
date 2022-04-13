import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import loginReducer from '../features/login/loginSlice';
import productsReducer from '../features/products/productsSlice';
import detailProductReducer from '../features/detailProduct/detailProductSlice';
import usersReducer from '../features/users/usersSlice';


export const store = configureStore({
  reducer: {
    counter: counterReducer,
    login:loginReducer,
    products:productsReducer,
    detailProduct:detailProductReducer,
    users:usersReducer,
  },
});
