import {createSlice} from "@reduxjs/toolkit"

const ratingSlice = createSlice({
    name:"rating",
    initialState:{
        rating: '',
    },
    reducers:{
        setRating: (state, action)=>{
            state.rating=action.payload
        }

    }
})

export const { setRating } = ratingSlice.actions;
export default ratingSlice.reducer;