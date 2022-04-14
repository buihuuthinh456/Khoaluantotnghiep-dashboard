import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {getCategory} from '../../api';

const initialState = {
    isLoading: false,
    resultTotal:0,
    categories:null,
};


export const fetchCategories = createAsyncThunk(
    'category/fetchCategories',
    async ()=>{
        try {
            const response = await getCategory()
           return response
        } catch (error) {
            console.log(error.response)
        }
    }
)

export const categoriesSlice = createSlice({
    name:"categories",
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
            .addCase(fetchCategories.pending,(state,action)=>{
                state.isLoading = true;
            })
            .addCase(fetchCategories.fulfilled,(state,action)=>{
                if(action.payload){
                    state.categories = action.payload.data
                    state.resultTotal = 1
                }
                state.isLoading=false;
            })
    }
})

export const selectCategories = (state) => state.categories

export default categoriesSlice.reducer;