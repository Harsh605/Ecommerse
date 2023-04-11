import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const getProductsApi = createAsyncThunk("getProducts", async () => {
    let url = `http://localhost:5500/api/v1/product`
    const res = await fetch(url)
    const result = res.json()
    return result
})

export const getFilterProductsApi = createAsyncThunk("getFilterProducts", async ({keyword="",currentPage=1,price=[0, 500000],category,ratings=0}) => {
    let url = `http://localhost:5500/api/v1/product?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`

    if(category){
        url = `http://localhost:5500/api/v1/product?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`
    }
    const res = await fetch(url)
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
        filterProductsdata: [],
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
        .addCase(getFilterProductsApi.pending,(state)=>{
            state.isLoading=true
        })
        .addCase(getFilterProductsApi.fulfilled,(state,action)=>{
            state.isLoading=false
            state.filterProductsdata=action.payload
        })
        .addCase(getFilterProductsApi.rejected,(state)=>{
            state.isError=true
            state.filterProductsdata=null
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