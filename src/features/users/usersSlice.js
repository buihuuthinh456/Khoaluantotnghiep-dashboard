import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

import { deleteUser, getUsers } from "../../api";

const initialState = {
  isLoading: false,
  isReload: false,
  users: [],
};

export const fetchUsers = createAsyncThunk(
  "users/fetchUsers",
  async (token) => {
    try {
      const response = await getUsers(token);
      return response;
    } catch (error) {
      console.log(error.response);
    }
  }
);

export const deleteUserThunk = createAsyncThunk(
  "users/deleteUserThunk",
  async (payload) => {
    try {
      const response = await deleteUser(payload);
      return response;
    } catch (error) {
      console.log(error.response);
    }
  }
);

export const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        if (action.payload) {
          const data = action.payload.data;
          console.log(data);
          state.users = data;
        }
        state.isLoading = false;
        state.isReload = false;
      });

    builder
      .addCase(deleteUserThunk.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteUserThunk.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isReload = true;
        if (action.payload.data?.msg) {
          toast.success("Xóa user thành công", {
            style: {
              fontSize: "1.6rem",
            },
          });
        }
      });
  },
});

export const selectUsers = (state) => state.users;

export default usersSlice.reducer;
