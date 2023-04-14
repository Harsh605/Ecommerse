import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

export const login = createAsyncThunk("login", async ({ email, password }, { rejectWithValue }) => {
    let url = `http://localhost:5500/api/v1/login`
    const config = {
        headers: {
            "Content-Type": "application/json"         //bina config ke cookie nhi set honi dhyan rakhna
        },
        withCredentials: true
    }
    try {
        const response = await axios.post(url, { email, password }, config); // replace with your API endpoint and data
        console.log(response.data)
        return response.data;
    }
    catch (error) {
        return rejectWithValue(error.response.data.error)
    }
})
export const register = createAsyncThunk("register", async ({ name, email, password, avatar }, { rejectWithValue }) => {
    const config = {
        headers: {
            "Content-Type": "application/multipart/form-data"
        },
        withCredentials: true
    }
    let url = `http://localhost:5500/api/v1/register`
    try {
        const response = await axios.post(url, { name, email, password, avatar }, config); // replace with your API endpoint and data
        console.log(response.data)
        return response.data;
    } catch (error) {
        return rejectWithValue(error.response.data.error)
    }
})


export const logout = createAsyncThunk("logout", async (_, { rejectWithValue }) => {
    let url = `http://localhost:5500/api/v1/logout`

    try {
        await axios.post(url, {}, { withCredentials: true });
    } catch (error) {
        return rejectWithValue(error.response.data)
    }


})
export const loadUser = createAsyncThunk("loadUser", async () => {
    let url = `http://localhost:5500/api/v1/me`
    const config = {
        headers: {
            "Content-Type": "application/json"
        },
        withCredentials: true
    }
    try {
        const response = await axios.post(url, {}, config); // replace with your API endpoint and data
        return response.data;
    }
    catch (error) {
        throw new Error(error.response.data.error)
    }
})

export const updatePassword = createAsyncThunk("updatePassword", async ({ oldPassword, newPassword, confirmPassword }) => {
    let url = `http://localhost:5500/api/v1/password/Update`
    const config = { headers: { "Content-Type": "application/json" },withCredentials: true };
    try {
        const response = await axios.put(url, { oldPassword, newPassword, confirmPassword }, config)
        console.log(response.data.success)
        return response.data
    } catch (error) {
        console.log(error.response.data.error)
        return error.response.data.error
    }


})
export const updateProfile = createAsyncThunk("updateProfile", async ({ name, email,avatar }) => {
    let url = `http://localhost:5500/api/v1/me/Update`
    const config = { headers: { "Content-Type": "application/multipart/form-data" },withCredentials: true };
    try {
        const response = await axios.put(url, { name, email,avatar }, config)
        console.log(response.data.success)
        return response.data
    } catch (error) {
        console.log(error.response.data.error)
        return error.response.data.error
    }


})




export const userSlice = createSlice({
    name: "user",
    initialState: {
        isLoading: false,
        isAuthenticated: false,
        error: null,
        userData: null,
        isUpdated: false
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.isAuthenticated = true
                state.userData = action.payload.user
            })
            .addCase(register.rejected, (state, action) => {
                state.error = action.payload
                state.isAuthenticated = false
                state.isLoading = false
                state.userData = null
            })

            .addCase(login.pending, (state) => {
                state.isLoading = true

            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.isAuthenticated = true
                state.userData = action.payload.user
            })
            .addCase(login.rejected, (state, action) => {
                state.error = action.payload
                state.isAuthenticated = false
                state.isLoading = false
                state.userData = null

            })

            .addCase(logout.fulfilled, (state, action) => {
                state.isLoading = false
                state.isAuthenticated = false
                state.userData = null
            })
            .addCase(logout.rejected, (state, action) => {
                state.error = action.payload
                state.isLoading = false

            })

            .addCase(loadUser.pending, (state) => {
                state.isLoading = true
                state.isAuthenticated = false
            })
            .addCase(loadUser.fulfilled, (state, action) => {
                state.isLoading = false
                state.isAuthenticated = true
                state.userData = action.payload.user
            })
            .addCase(loadUser.rejected, (state, action) => {
                state.error = action.error.message
                state.isAuthenticated = false
                state.isLoading = false
                state.userData = null

            })
            .addCase(updatePassword.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updatePassword.fulfilled, (state, action) => {
                state.isLoading = false
                state.isUpdated = action.payload.success
            
            })
            .addCase(updatePassword.rejected, (state, action) => {
                state.error = action.error
                state.isUpdated = action.payload.success
                state.isLoading = false

            })
            .addCase(updateProfile.pending, (state) => {
                state.isLoading = true
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.isLoading = false
                state.isUpdated = action.payload.success
            
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.error = action.error
                state.isUpdated = action.payload.success
                state.isLoading = false

            })
            


    }
})


export default userSlice.reducer

