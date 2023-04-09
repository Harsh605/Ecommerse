import {configureStore} from "@reduxjs/toolkit"
import getProductsSlice  from "./slices/ProductSlice.js"

const store = configureStore({
    reducer: {
        custom : getProductsSlice
    }
})

export default store