import {createAsyncThunk,createSlice} from '@reduxjs/toolkit';

import {getUsers} from '../../api'

const initialState = {
    isLoading: false,
    users:[],
};


export const fetchUsers = createAsyncThunk(
    'users/fetchUsers',
    async (token)=>{
        try {
            const response = await getUsers(token)
           return response
        } catch (error) {
            console.log(error.response)
        }
    }
)

export const usersSlice = createSlice({
    name:"users",
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        builder
            .addCase(fetchUsers.pending,(state,action)=>{
                state.isLoading = true;
            })
            .addCase(fetchUsers.fulfilled,(state,action)=>{
                if(action.payload){
                    const data = action.payload.data;
                    console.log(data)
                    state.users = data
                }
                state.isLoading=false;
            })
    }
})



export const selectUsers = (state) => state.users

export default usersSlice.reducer;