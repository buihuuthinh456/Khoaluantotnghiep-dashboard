import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {handleLoginUser} from '../../api/index';

import { toast } from "react-toastify";

const initialState = {
    accessToken: '',
    isLogin: false,
    info:{},
};

export const handleLogin = createAsyncThunk(
    'login/handleLogin',
    async (payload) => {
      try {
        const response = await toast.promise(handleLoginUser(payload),{
             pending: 'Login is handling',
              success: 'Login successfull 👌',
              error: 'Login error 🤯'
            },{
              style:{fontSize:"1.6rem"}
        });
        console.log(response)
        // The value we return becomes the `fulfilled` action payload

        return response.data;
      } catch (error) {
          console.log(error)
      }
    }
);

export const loginSlice = createSlice({
    name:"login",
    initialState,
    reducers:{
      logOut: (state) => {
        return state = initialState
      }
    },
    extraReducers: (builder) => {
        builder
          .addCase(handleLogin.fulfilled, (state, action) => {
            if(action.payload){
              const {accessToken,...info} = action.payload
              state.accessToken = accessToken
              state.isLogin = true
              state.info={...info};
            }
          })
      },
})

export const {logOut} = loginSlice.actions

export const selectLogin = (state) => state.login;

export default loginSlice.reducer;