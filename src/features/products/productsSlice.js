import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {getAllProduct,searchProductAPI,getCategory} from '../../api';

const initialState = {
    isLoading: false,
    resultTotal:0,
    products:[],
    category:[]
};

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async ()=>{
        try {
            const response = await Promise.all([getAllProduct(),getCategory()])
           return response
        } catch (error) {
            console.log(error.response)
        }
    }
)


export const searchProduct = createAsyncThunk(
    'products/searchProduct',
    async (regex)=>{
        try {
            const response = await searchProductAPI(regex)
           return response
        } catch (error) {
            console.log(error.response)
        }
    }
)

export const productsSlice = createSlice({
    name:"products",
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
            .addCase(fetchProducts.pending,(state,action)=>{
                state.isLoading = true;
            })
            .addCase(fetchProducts.fulfilled,(state,action)=>{
                if(action.payload){
                    const {result,products} = action.payload[0].data;
                    state.category = action.payload[1].data
                    state.resultTotal = result
                    state.products = products
                }
                state.isLoading=false;
            })
            .addCase(searchProduct.pending,(state,action)=>{
                state.isLoading = true;
            }) 
            .addCase(searchProduct.fulfilled,(state,action)=>{
                if(action.payload){
                    const {result,products} = action.payload.data;
                    state.resultTotal = result;
                    state.products = products;
                }

                state.isLoading = false;
            })    
    }
})

export const selectProducts = (state) => state.products

export default productsSlice.reducer;