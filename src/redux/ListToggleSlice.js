import {createSlice} from "@reduxjs/toolkit"

const ListToggleSlice = createSlice({
    name:"listToggle",
    initialState:{
        toggle: false,
    },
    reducers:{
        setToggle: (state, action)=>{
            state.toggle= action.payload
        }

    }
})

export const { toggleList,setToggle } = ListToggleSlice.actions;
export default ListToggleSlice.reducer;