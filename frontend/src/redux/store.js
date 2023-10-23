import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user";

export const Store = configureStore({
    reducer:{
        user: userReducer,
    },
})

export default Store;