import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user";
import { sellerReducer } from "./reducers/seller";
import { productReducer } from "./reducers/product";

export const Store = configureStore({
    reducer:{
        user: userReducer,
        seller: sellerReducer,
        product: productReducer,
    },
})

export default Store;