import {configureStore, combineReducers} from "@reduxjs/toolkit";

// slice
import kindReducer from "./KindSlice";
import locationReducer from './locationSlice'
import placeReducer from './placeSlice'


export const myStore = configureStore({
    reducer: {
        kind:kindReducer,
        location:locationReducer,
        place:placeReducer,
    }
})