import {configureStore, combineReducers} from "@reduxjs/toolkit";

// slice
import kindReducer from "./kindSlice";
import locationReducer from './locationSlice'
import placeReducer from './placeSlice';
import ratingReducer from "./ratingSlice";



export const myStore = configureStore({
    reducer: {
        kind:kindReducer,
        location:locationReducer,
        place:placeReducer,
        rating:ratingReducer
    }
})