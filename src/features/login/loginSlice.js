import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {getInfoUser, handleLoginUser} from '../../api/index';

import { toast } from "react-toastify";

const initialState = {
    accessToken: '',
    isLogin: false,
    info:{},
    isAdmin:false,
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
          toast.error(error.response.data.msg, {
            position: toast.POSITION.TOP_RIGHT,
            style:{fontSize:"1.6rem"}
          });
      }
    }
);


export const getInfo = createAsyncThunk(
  'login/getInfo',
  async () => {
    try {
      const response = await getInfoUser()
      console.log(response)
      return response.data;
    } catch (error) {
        localStorage.removeItem("accessToken")
        console.log(error.response)
        toast.error(error.response.data.msg, {
          position: toast.POSITION.TOP_RIGHT,
          style:{fontSize:"1.6rem"}
        });
    }
  }
);

export const loginSlice = createSlice({
    name:"login",
    initialState,
    reducers:{
      logOut: (state) => {
        localStorage.removeItem('accessToken')
        return state = initialState
      }
    },
    extraReducers: (builder) => {
        builder
          .addCase(handleLogin.fulfilled, (state, action) => {
            if(action.payload){
              const {accessToken,isAdmin,...info} = action.payload
              localStorage.setItem('accessToken',accessToken)
              state.accessToken = accessToken
              state.isLogin = true
              state.info={...info};
              state.isAdmin=isAdmin;
            }
          })
          .addCase(getInfo.fulfilled,(state,action)=>{
            console.log(action.payload)
            if(action.payload.data?.errorExpiredAt){
              localStorage.removeItem('accessToken')
              return state = initialState
            }
            else{
              const {accessToken,isAdmin,...info} = action.payload;
              state.accessToken=localStorage.getItem('accessToken')
              state.isLogin = true;
              state.info={...info};
              state.isAdmin=isAdmin;
            }
          })
      },
})

export const {logOut} = loginSlice.actions

export const selectLogin = (state) => state.login;

export default loginSlice.reducer;