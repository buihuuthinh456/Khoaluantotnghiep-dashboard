import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';

import {getAllProduct,searchProductAPI,getCategory,uploadImage, createProduct} from '../../api';
import {toast} from 'react-toastify';


const initialState = {
    isLoading: false,
    resultTotal:0,
    products:[],
    category:[],
    totalPage:0,
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

export const createProductThunk = createAsyncThunk(
    'products/createProduct',
    async (dataPass)=>{
        try {
            console.log(dataPass)
            const accessToken = dataPass.accessToken
            const img = dataPass.img
            const value = dataPass.value
           const imgUpload = await uploadImage(img, accessToken)
           const {data} = imgUpload
           const {name,
                 productID,
                 category,
                 price,
                 description} = value

            const dataPost = {
            productId: productID,
            name: name,
            description: description,
            price: price,
            category: category,
            images: [data]
            }
            const res = await createProduct(dataPost, accessToken)
            return res
        } catch (error) {
            console.log(error.response)
            toast.error(error.response.msg,{
                style:{
                    fontSize:'1.6rem',
                }
            })
            return error.response
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
                    const {result,products,totalPage} = action.payload[0].data;
                    console.log(action.payload[0].data)
                    state.category = action.payload[1].data
                    state.resultTotal = result
                    state.products = products
                    state.totalPage = totalPage
                }
                state.isLoading=false;
            })
            .addCase(createProductThunk.pending,(state,action)=>{
                state.isLoading = true;
            })
            .addCase(createProductThunk.fulfilled,(state,action)=>{
                state.isLoading = false;
                console.log(action.payload)
                if(action.payload.status===400)
                {
                    toast.error('Create product error',{
                        style:{
                            fontSize:'1.6rem',
                        }
                    })
                }else{
                    toast.success('Create product successfull',{
                        style:{
                            fontSize:'1.6rem',
                        }
                    })
                }
            })
            .addCase(searchProduct.pending,(state,action)=>{
                state.isLoading = true;
            }) 
            .addCase(searchProduct.fulfilled,(state,action)=>{
                if(action.payload){
                    const {result,products,totalPage} = action.payload.data;
                    state.resultTotal = result;
                    state.products = products;
                    state.totalPage = totalPage
                }

                state.isLoading = false;
            })    
    }
})

export const selectProducts = (state) => state.products

export default productsSlice.reducer;