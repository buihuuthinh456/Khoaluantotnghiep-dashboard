import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { toast } from "react-toastify";

import {
  getSliderImage,
  createSliderImage,
  deleteSliderImage,
  uploadImage,
} from "../../api";

const initialState = {
  isLoading: false,
  isReload: false,
  data: null,
};

export const fetchImgSlider = createAsyncThunk(
  "imgSlider/fetchImgSlider",
  async () => {
    try {
      const res = await getSliderImage();
      return res;
    } catch (error) {
      console.log(error.response);
    }
  }
);

export const deleteImgSliderAsync = createAsyncThunk(
  "imgSlider/deleteImgSliderAsync",
  async (payload) => {
    try {
      const res = await deleteSliderImage(payload);
      return res;
    } catch (error) {
      console.log(error.response);
    }
  }
);

export const createSliderImageAsync = createAsyncThunk(
  "imgSlider/createSliderImageAsync",
  async (payload) => {
    try {
      const { name, form } = payload;
      console.log(form);
      const imgUpload = await uploadImage(
        form,
        localStorage.getItem("accessToken")
      );
      console.log("imgUpload", imgUpload);
      const { data } = imgUpload;
      const dataSend = {
        name: name,
        img: data,
      };
      const res = await createSliderImage(dataSend);
      return res;
    } catch (error) {
      console.log(error.response);
    }
  }
);

export const imgSliderSlice = createSlice({
  name: "imgSlider",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchImgSlider.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchImgSlider.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isReload = false;
        state.data = action.payload.data;
      });

    builder
      .addCase(deleteImgSliderAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteImgSliderAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isReload = true;
        if (action.payload.status === 200) {
          toast.success(action.payload.data.msg, {
            style: {
              fontSize: "1.6rem",
            },
          });
        }
      });
    builder
      .addCase(createSliderImageAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createSliderImageAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isReload = true;
        if (action.payload.status === 200) {
          toast.success(action.payload.data.msg, {
            style: {
              fontSize: "1.6rem",
            },
          });
        }
      });
  },
});

export const selectImgSlider = (state) => state.imgSlider;

export default imgSliderSlice.reducer;
