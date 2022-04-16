import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {getCategory,createCategory} from '../../api';

import { toast } from 'react-toastify';

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

export const createCategoryThunk = createAsyncThunk(
    'category/createCategory',
    async (data)=>{
        try {
            console.log(data)
            const response = await createCategory(data.values,data.token)
           return response
        } catch (error) {
            console.log(error.response)
            
            toast.error(error.response.data.msg,{
                style:{
                    fontSize:'1.6rem',
                }
            })
            return {status:400}
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
            .addCase(createCategoryThunk.pending,(state,action)=>{
                state.isLoading = true;
            })
            .addCase(createCategoryThunk.fulfilled,(state,action)=>{
                state.isLoading = false;
                console.log(action.payload)
                if(action.payload.status===400)
                {
                    toast.error('Create category error',{
                        style:{
                            fontSize:'1.6rem',
                        }
                    })
                }else{
                    toast.success('Create category successfull',{
                        style:{
                            fontSize:'1.6rem',
                        }
                    })
                }
                
            })
            
    }
})

export const selectCategories = (state) => state.categories

export default categoriesSlice.reducer;