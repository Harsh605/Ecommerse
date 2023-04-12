import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export const login = createAsyncThunk("login", async ({email,password},{rejectWithValue }) => {
    let url = `http://localhost:5500/api/v1/login`
    try {
        const response = await axios.post(url, {email,password}); // replace with your API endpoint and data
        console.log(response.data)
        return response.data;   
    }
     catch (error) {
        return  rejectWithValue(error.response.data.error)
      }
})
export const register = createAsyncThunk("register", async ({name,email,password,avatar},{rejectWithValue }) => {
    let url = `http://localhost:5500/api/v1/register`
    try {
        const response = await axios.post(url, {name,email,password,avatar}); // replace with your API endpoint and data
        console.log(response.data)
        return response.data;
      } catch (error) {
        return  rejectWithValue(error.response.data.error)
      }
})

export const userSlice = createSlice({
    name: "user",
    initialState: {
        isLoading : false,
        isAuthenticated: false,
        isError: null,
        data: null
    },
    extraReducers: (builder)=>{
        builder
        .addCase(register.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(register.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isAuthenticated=true
            state.data = action.payload.user
        })
        .addCase(register.rejected,(state,action)=>{
            state.isError=true
            state.isAuthenticated=false
            state.isLoading=false
            state.data=action.payload
        })
        
        .addCase(login.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(login.fulfilled,(state,action)=>{
            state.isLoading=false
            state.isAuthenticated=true
            state.data = action.payload.user
        })
        .addCase(login.rejected,(state,action)=>{
            state.isError=true
            state.isAuthenticated=false
            state.isLoading=false
            state.data=action.payload

        })
        
       
    }
})


export default userSlice.reducer

