import {createSlice} from "@reduxjs/toolkit"

const placeSlice = createSlice({
    name:"place",
    initialState:{
        places:[],
    },
    reducers:{
        setPlaces: (state, action)=>{
            // filter out places which don't have name and rate // and only get 10 places
            state.places=action.payload.filter((place)=> place.properties.name && place.properties.rate>=1).slice(0,10)
        },
       
    }
})

export const { setPlaces } = placeSlice.actions;
export default placeSlice.reducer;