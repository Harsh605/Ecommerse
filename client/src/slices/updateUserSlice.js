// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
// import axios from "axios"



// export const updateUserSlice = createSlice({
//     name: "user",
//     initialState: {
//         isLoading: false,
//         updatedUserData: null,
//         isUpdated: false,
//         error:null
//     },
//     extraReducers: (builder) => {
//         builder
//             .addCase(updateProfile.pending, (state) => {
//                 state.isLoading = true
//             })
//             .addCase(updateProfile.fulfilled, (state, action) => {
//                 state.isLoading = false
//                 state.isUpdated = action.payload.success
//                 // state.userData = action.payload.user
            
//             })
//             .addCase(updateProfile.rejected, (state, action) => {
//                 state.error = action.error
//                 state.isUpdated = action.payload.success
//                 state.isLoading = false

//             })
            


//     }
// })

// export default updateUserSlice.reducer