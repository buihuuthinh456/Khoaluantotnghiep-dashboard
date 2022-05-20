import {createAsyncThunk,createSlice} from '@reduxjs/toolkit';

import {getOrders} from '../../api'






const initialState = {
    isLoading: false,
    orders:[],
};


export const fetchOrders = createAsyncThunk(
    'orders/fetchOrders',
    async ()=>{
        try {
            const response = await getOrders()
           return response
        } catch (error) {
            console.log(error.response)
        }
    }
)


export const ordersSlice = createSlice({
    name:"orders",
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
            .addCase(fetchOrders.pending,(state,action)=>{
                state.isLoading = true;
            })
            .addCase(fetchOrders.fulfilled,(state,action)=>{
                if(action.payload){
                    const data = action.payload.data;
                    state.orders = data
                }
                state.isLoading=false;
            })
    }
})



export const selectOrders = (state) => state.orders

export default ordersSlice.reducer;