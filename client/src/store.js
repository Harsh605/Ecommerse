import {configureStore} from "@reduxjs/toolkit"
import getProductsSlice  from "./slices/ProductSlice.js"
import userSlice  from "./slices/userSlice.js"
import resetPasswordSlice  from "./slices/passwordResetSlice.js"
import  cartSlice  from "./slices/addToCartSlice.js"

const store = configureStore({
    reducer: {
        custom : getProductsSlice,
        custom2: userSlice,
        custom3: resetPasswordSlice,
        custom4: cartSlice
    }
})

export default store