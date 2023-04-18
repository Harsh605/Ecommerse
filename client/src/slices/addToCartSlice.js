import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addItemsToCart = createAsyncThunk("addItemsToCart", async ({ id, qty }, { getState, rejectWithValue }) => {

    const { custom4 } = getState();
    const { items } = custom4;                   //already cart items

    let existingProduct = items.find(
        (item) => item.productId === id
    )

    if (existingProduct) {
        // existingProduct.quantity += qty;          //We can't do like this
        const updatedCartItems = items.map(item =>
            item.productId === id ? { ...item, quantity: item.quantity + qty } : item
        );
        return updatedCartItems;
    }
    else {
        const res = await axios.get(`http://localhost:5500/api/v1/product/${id}`)
        const newProduct = {
            productId: res.data.product._id,
            name: res.data.product.name,
            price: res.data.product.price,
            image: res.data.product.images[0].url,
            stock: res.data.product.stock,
            category: res.data.product.category,
            quantity: qty
        }
        const updatedCartItems = [...items, newProduct]
        return updatedCartItems
    }

})



export const removeItemsFromCart = createAsyncThunk("removeItemsFromCart", ({ id }, { getState, rejectWithValue }) => {
    const { custom4 } = getState();
    const { items } = custom4;
    const updatedCartItems = items.filter(product => product.productId !== id);

    return updatedCartItems

})

export const saveShippingInfo = createAsyncThunk("shippingInfo/save", ({Name, address, city, state, country, pinCode, phoneNo,email }) => {
    const shippingInfo = {Name, address, city, state, country, pinCode, phoneNo,email }
    return shippingInfo
})



export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: localStorage.getItem("cartItems") ? JSON.parse(localStorage.getItem("cartItems")) : [],
        isLoading: false,
        error: null,
        shippingInfo: localStorage.getItem("shippingInfo")? JSON.parse(localStorage.getItem("shippingInfo"))
        : {},
    },

    extraReducers: (builder) => {
        builder
            .addCase(addItemsToCart.pending, (state) => {
                state.isLoading = true
            })
            .addCase(addItemsToCart.fulfilled, (state, action) => {
                state.isLoading = false
                state.items = action.payload
                localStorage.setItem('cartItems', JSON.stringify(action.payload));
            })
            .addCase(addItemsToCart.rejected, (state, action) => {
                state.error = action.payload
                state.isLoading = false
            })
            .addCase(removeItemsFromCart.pending, (state) => {
                state.isLoading = true
            })
            .addCase(removeItemsFromCart.fulfilled, (state, action) => {
                state.isLoading = false
                state.items = action.payload
                localStorage.setItem('cartItems', JSON.stringify(action.payload));
            })
            .addCase(removeItemsFromCart.rejected, (state, action) => {
                state.error = "error"
                state.isLoading = false
            })
            .addCase(saveShippingInfo.pending, (state) => {
                state.isLoading = true
            })
            .addCase(saveShippingInfo.fulfilled, (state, action) => {
                state.isLoading = false
                state.shippingInfo = action.payload
                localStorage.setItem("shippingInfo", JSON.stringify(action.payload));
            })
            .addCase(saveShippingInfo.rejected, (state, action) => {
                state.error = "error"
                state.isLoading = false
            })

    }

})

export default cartSlice.reducer;