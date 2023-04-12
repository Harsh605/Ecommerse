import {configureStore} from "@reduxjs/toolkit"
import getProductsSlice  from "./slices/ProductSlice.js"
import userSlice  from "./slices/userSlice.js"

const store = configureStore({
    reducer: {
        custom : getProductsSlice,
        custom2: userSlice,
    }
})

export default store