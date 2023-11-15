import { configureStore } from "@reduxjs/toolkit";
import employeeSlice from "./employeeSlice";

export const store=configureStore({
    reducer:{
        users:employeeSlice
    }
})

export default store