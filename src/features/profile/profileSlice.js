import {createAsyncThunk,createSlice} from '@reduxjs/toolkit';

import {getUserByID, historyPayment, historyPaymentByID} from '../../api'

const initialState = {
    isLoading: false,
    info: null,
    history:null,
};

export const getUserInfo = createAsyncThunk("users/getUserInfo", async(payload)=>{
    try {
        const response = await getUserByID(payload)
        return response
    } catch (error) {
        console.log(error.response)
    }
})

export const getHistoryByIDAsync = createAsyncThunk("users/getHistoryByIDAsync", async(payload)=>{
    try {
        const response = await historyPaymentByID(payload)
        return response
    } catch (error) {
        console.log(error.response)
    }
})


export const profileSlice = createSlice({
    name:"profile",
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder.addCase(getHistoryByIDAsync.pending, state=>{
            state.isLoading = true
        }).addCase(getHistoryByIDAsync.fulfilled, (state, action) => {
            state.isLoading=false;
            state.history = action.payload.data
        })

        builder.addCase(getUserInfo.pending, state=>{
            state.isLoading = true
        }).addCase(getUserInfo.fulfilled, (state, action) => {
            state.isLoading=false;
            state.info = action.payload.data
        })
    }
})

export const selectsProfile = (state) => state.profile

export default profileSlice.reducer;