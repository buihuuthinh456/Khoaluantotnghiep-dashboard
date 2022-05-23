import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { createMoreProductInfo, getDetailProduct, uploadImage } from "../../api";

const initialState = {
  isLoading: false,
  data: null,
};

export const fetchDetailProduct = createAsyncThunk(
  "detailProduct/fetchDetailProduct",
  async (id) => {
    try {
      const response = await getDetailProduct(id);
      return response;
    } catch (error) {
      console.log(error);
    }
  }
);

// create more info products

export const createMoreInfoProductAsync = createAsyncThunk(
  "detailProduct/createMoreInfoProductAsync",
  async (payload) => {
    try {
      const {id, value, formImg} = payload
      const imgUpload = await uploadImage(formImg, localStorage.getItem('accessToken'))
      const {data} = imgUpload
      const dataPost = {
        title: value.title,
        table: value.table,
        id: id,
        url_img: [data],
      }
      const response = await createMoreProductInfo(id, dataPost)
      return response
    } catch (error) {
      console.log(error.response);
    }
  }
);

export const detailProductSlice = createSlice({
  name: "detailProduct",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchDetailProduct.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchDetailProduct.fulfilled, (state, action) => {
        if (action.payload) {
          const data = action.payload.data;
          state.data = { ...data };
        }

        state.isLoading = false;
      });
    builder.addCase(createMoreInfoProductAsync.pending, (state, action)=>{
      state.isLoading = true
    }).addCase(createMoreInfoProductAsync.fulfilled,(state,action)=>{
      state.isLoading = false
      console.log("add complete", action.payload);
    })
  },
});

export const selectDetailProduct = (state) => state.detailProduct;

export default detailProductSlice.reducer;
