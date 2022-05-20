import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  getCategory,
  createCategory,
  deleteCategory,
  updateCategory,
} from "../../api";

import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  resultTotal: 0,
  categories: null,
  isReload: false,
};

export const fetchCategories = createAsyncThunk(
  "category/fetchCategories",
  async () => {
    try {
      const response = await getCategory();
      return response;
    } catch (error) {
      console.log(error.response);
    }
  }
);

export const createCategoryThunk = createAsyncThunk(
  "category/createCategory",
  async (data) => {
    try {
      console.log(data);
      const response = await createCategory(data.values, data.token);
      return response;
    } catch (error) {
      console.log(error.response);

      toast.error(error.response.data.msg, {
        style: {
          fontSize: "1.6rem",
        },
      });
      return { status: 400 };
    }
  }
);

export const deleteCategoryAsync = createAsyncThunk(
  "category/deleteCategoryAsync",
  async (payload) => {
    try {
      if (localStorage.getItem("accessToken")) {
        const token = localStorage.getItem("accessToken");
        const id = payload._id;
        const response = await deleteCategory(id, token);
        return response;
      }
    } catch (error) {
      toast.error(error.response.data.msg, {
        style: {
          fontSize: "1.6rem",
        },
      });
    }
  }
);

export const updateCategoryAsync = createAsyncThunk(
  "category/updateCategoryAsync",
  async (payload) => {
    try {
      const { id, token, values } = payload;
      const response = await updateCategory(values, token, id);
      return response;
    } catch (error) {
      toast.error(error.response.data.msg, {
        style: {
          fontSize: "1.6rem",
        },
      });
    }
  }
);

export const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategories.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        if (action.payload) {
          state.categories = action.payload.data;
          state.resultTotal = 1;
        }
        state.isLoading = false;
        state.isReload = false;
      })
      .addCase(createCategoryThunk.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createCategoryThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isReload = true;
        if (action.payload.status === 400) {
          toast.error("Create category error", {
            style: {
              fontSize: "1.6rem",
            },
          });
        } else {
          toast.success("Create category successful", {
            style: {
              fontSize: "1.6rem",
            },
          });
        }
      });

    builder.addCase(deleteCategoryAsync.fulfilled, (state, action) => {
      if (action.payload.data.msg) {
        state.isReload = true
        toast.success(action.payload.data.msg, {
          style: {
            fontSize: "1.6rem",
          },
        });
      }
    });
    builder.addCase(deleteCategoryAsync.rejected, (state, action) => {
      console.log("delete rejected", action);
    })

    builder.addCase(updateCategoryAsync.pending, (state,action) =>{
      state.isLoading = true
    })

    builder.addCase(updateCategoryAsync.fulfilled, (state, action) => {
      state.isLoading = false
      state.isReload = true;
      if (action.payload.data.msg) {
        toast.success(action.payload.data.msg, {
          style: {
            fontSize: "1.6rem",
          },
        });
      }
    });
  },
});

export const selectCategories = (state) => state.categories;

export default categoriesSlice.reducer;
