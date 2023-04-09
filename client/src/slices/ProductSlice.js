import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const getProductsApi = createAsyncThunk("getProducts", async (keyword="",currentPage=1) => {
    // console.log(currentPage)
    const res = await fetch(`http://localhost:5500/api/v1/product?keyword=${keyword}&page=${currentPage}`)
    const result = res.json()
    return result
})
export const getSingleProductsApi = createAsyncThunk("getSingleProducts", async (id) => {
    const res = await fetch(`http://localhost:5500/api/v1/product/${id}`)
    const result = res.json()
    return result
})

export const getProductsSlice = createSlice({
    name: "products",
    initialState: {
        isLoading : false,
        data: [],
        singleProductData:{},
        isError: false
    },
    extraReducers: (builder)=>{
        builder
        .addCase(getProductsApi.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getProductsApi.fulfilled,(state,action)=>{
            state.isLoading=false
            state.data=action.payload
        })
        .addCase(getProductsApi.rejected,(state)=>{
            state.isError=true
            state.data=null
            state.isLoading=false
        })
        .addCase(getSingleProductsApi.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getSingleProductsApi.fulfilled,(state,action)=>{
            state.isLoading=false
            state.singleProductData=action.payload
        })
        .addCase(getSingleProductsApi.rejected,(state)=>{
            state.isError=true
            state.singleProductData=null
        })
    }
})

export default getProductsSlice.reducer