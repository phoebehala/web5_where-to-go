import {createSlice} from "@reduxjs/toolkit"

const locationSlice = createSlice({
    name:"location",
    initialState:{
        coordinates:{},
        bounds:null
    },
    reducers:{
        setCoordinates: (state, action)=>{
            state.coordinates=action.payload
        },
        setBounds: (state, action)=>{
            state.bounds=action.payload
        }


    }
})

export const {setCoordinates, setBounds } = locationSlice.actions;
export default locationSlice.reducer;