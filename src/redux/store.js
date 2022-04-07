import {configureStore, combineReducers} from "@reduxjs/toolkit";

// slice
import kindReducer from "./KindSlice";
import locationReducer from './locationSlice'
import placeReducer from './placeSlice';
import ratingReducer from "./ratingSlice";
import listToggleReducer from './ListToggleSlice'


export const myStore = configureStore({
    reducer: {
        kind:kindReducer,
        location:locationReducer,
        place:placeReducer,
        rating:ratingReducer,
        listToggle:listToggleReducer,
    }
})