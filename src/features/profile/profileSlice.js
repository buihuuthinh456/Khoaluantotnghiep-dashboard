import {createAsyncThunk,createSlice} from '@reduxjs/toolkit';

import {historyPayment} from '../../api'

const initialState = {
    isLoading: false,
    history:null,
};


export const getHistoryPayment = createAsyncThunk("users/getHistoryPayment", async() => {
    try {
        const response = await historyPayment()
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
        builder
            .addCase(getHistoryPayment.pending,(state,action)=>{
                state.isLoading = true;
            })
            .addCase(getHistoryPayment.fulfilled,(state,action)=>{
                state.history = action.payload.data
                state.isLoading=false;
            })
    }
})

export const selectsProfile = (state) => state.profile

export default profileSlice.reducer;