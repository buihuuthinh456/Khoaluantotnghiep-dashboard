import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import {
  getAllProduct,
  searchProductAPI,
  getCategory,
  uploadImage,
  createProduct,
  deleteProduct,
  updateProduct,
} from "../../api";
import { toast } from "react-toastify";

const initialState = {
  isLoading: false,
  resultTotal: 0,
  products: [],
  category: [],
  totalPage: 0,
  isReload: false,
};

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    try {
      const response = await Promise.all([getAllProduct(), getCategory()]);
      return response;
    } catch (error) {
      console.log(error.response);
    }
  }
);

export const createProductThunk = createAsyncThunk(
  "products/createProduct",
  async (dataPass) => {
    try {
      const accessToken = dataPass.accessToken;
      const img = dataPass.img;
      const value = dataPass.value;
      const imgUpload = await uploadImage(img, accessToken);
      const { data } = imgUpload;
      const { name, productID, category, price, description } = value;
      const dataPost = {
        productId: productID,
        name: name,
        description: description,
        price: price,
        category: category,
        images: [data],
      };
      console.log("before call datapost", dataPost);
      const res = await createProduct(dataPost, accessToken);
      return res;
    } catch (error) {
      console.log(error.response);
      //   toast.error(error.response.msg, {
      //     style: {
      //       fontSize: "1.6rem",
      //     },
      //   });
      return error.response;
    }
  }
);

export const updateProductAsync = createAsyncThunk(
  "products/updateProductAsync",
  async (payload) => {
    try {
      const accessToken = payload.accessToken;
      const img = payload.img;
      const value = payload.value;
      const id = payload.id;
      const imgUpload = await uploadImage(img, accessToken);
      const { data } = imgUpload;
      const { name, productID, category, price, description } = value;
      const dataPost = {
        productId: productID,
        name: name,
        description: description,
        price: price,
        category: category,
        images: [data],
      };
      const res = await updateProduct(dataPost, accessToken, id);
      return res;
    } catch (error) {
      console.log(error.response);
      //   toast.error(error.response.msg, {
      //     style: {
      //       fontSize: "1.6rem",
      //     },
      //   });
      return error.response;
    }
  }
);

export const deleteProductAsync = createAsyncThunk(
  "products/deleteProductAsync",
  async (payload) => {
    try {
      if (localStorage.getItem("accessToken")) {
        const token = localStorage.getItem("accessToken");
        const id = payload;
        const response = await deleteProduct(id, token);
        return response;
      }
    } catch (error) {
      console.log(error.response);
    }
  }
);

export const searchProduct = createAsyncThunk(
  "products/searchProduct",
  async (regex) => {
    try {
      const response = await searchProductAPI(regex);
      return response;
    } catch (error) {
      console.log(error.response);
    }
  }
);

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        if (action.payload) {
          const { result, products, totalPage } = action.payload[0].data;
          console.log(action.payload[0].data);
          state.category = action.payload[1].data;
          state.resultTotal = result;
          state.products = products;
          state.totalPage = totalPage;
        }
        state.isLoading = false;
        state.isReload = false;
      })
      .addCase(createProductThunk.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(createProductThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isReload = true;
        console.log(action.payload);
        if (action.payload.status === 400) {
          toast.error("Create product error", {
            style: {
              fontSize: "1.6rem",
            },
          });
        } else {
          toast.success("Create product successfull", {
            style: {
              fontSize: "1.6rem",
            },
          });
        }
      })
      .addCase(createProductThunk.rejected, (state, action) => {
        console.log("rejected", action);
      })
      .addCase(searchProduct.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(searchProduct.fulfilled, (state, action) => {
        if (action.payload) {
          const { result, products, totalPage } = action.payload.data;
          state.resultTotal = result;
          state.products = products;
          state.totalPage = totalPage;
        }

        state.isLoading = false;
      });

    builder
      .addCase(deleteProductAsync.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(deleteProductAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isReload = true;
        if (action.payload.data.msg) {
          toast.success("Delete product complete", {
            style: {
              fontSize: "1.6rem",
            },
          });
        }
      })
      .addCase(deleteProductAsync.rejected, (state, action) => {
        console.log("rejected", action);
      });

    builder
      .addCase(updateProductAsync.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateProductAsync.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isReload = true;
        if (action.payload.data.msg) {
          toast.success("Update product complete", {
            style: {
              fontSize: "1.6rem",
            },
          });
        }
      })
      .addCase(updateProductAsync.rejected, (state, action) => {
        state.isLoading = false;
        console.log("rejected", action);
      });
  },
});

export const selectProducts = (state) => state.products;

export default productsSlice.reducer;
