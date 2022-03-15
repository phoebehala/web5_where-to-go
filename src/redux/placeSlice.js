import {createSlice} from "@reduxjs/toolkit"

const placeSlice = createSlice({
    name:"place",
    initialState:{
        places:[],
    },
    reducers:{
        setPlaces: (state, action)=>{
            state.places=action.payload
        },
       
    }
})

export const { setPlaces } = placeSlice.actions;
export default placeSlice.reducer;