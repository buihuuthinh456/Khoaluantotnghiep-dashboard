import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  getCategory,
  createCategory,
  deleteCategory,
  updateCategory,
  getDataAnalysis,
} from "../../api";

import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  data: null,
};

export const getDataAnalysisThunk = createAsyncThunk(
  "analysis/getDataAnalysisThunk",
  async (query) => {
    try {
      const response = await getDataAnalysis(query);
      return response;
    } catch (error) {
      console.log(error.response);
    }
  }
);

export const analysisSlice = createSlice({
  name: "analysis",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getDataAnalysisThunk.pending, state=>{
        state.isLoading = true
    }).addCase(getDataAnalysisThunk.fulfilled, (state, action) => {
        state.isLoading = false
        state.data = action.payload.data
    })
  },
});

export const selectAnalysis = (state) => state.analysis;

export default analysisSlice.reducer;
