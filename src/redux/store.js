import {configureStore, combineReducers} from "@reduxjs/toolkit";

// slice
import kindReducer from "./KindSlice";
import locationReducer from './locationSlice'


export const myStore = configureStore({
    reducer: {
        kind:kindReducer,
        location:locationReducer,
    }
})