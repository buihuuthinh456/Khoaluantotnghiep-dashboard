import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { createMoreProductInfo, getDetailProduct, uploadImage } from "../../api";

const initialState = {
  isLoading: false,
  data: null,
  moreInfo: null,
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
        state.moreInfo = null;
      })
      .addCase(fetchDetailProduct.fulfilled, (state, action) => {
        if (action.payload) {
          const data = action.payload.data;
          state.data = { ...data };
          state.moreInfo = action.payload.data.moreInfo
        }
        state.isLoading = false;
      });
    builder.addCase(createMoreInfoProductAsync.pending, (state, action)=>{
      state.isLoading = true
    }).addCase(createMoreInfoProductAsync.fulfilled,(state,action)=>{
      state.isLoading = false
      if (action.payload.status === 200) {
        toast.success("Tạo thành công", {
          style: {
            fontSize: "1.6rem",
          },
        });
      state.data = action.payload.data
      state.moreInfo = action.payload.data.moreInfo
      }
    })
  },
});

export const selectDetailProduct = (state) => state.detailProduct;

export default detailProductSlice.reducer;
