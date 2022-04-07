import {createSlice} from "@reduxjs/toolkit"

const kindsSlice = createSlice({
    name:"kinds",
    initialState:{
        kinds: '',
    },
    reducers:{
        setKinds: (state, action)=>{
            state.kinds=action.payload
        }

    }
})
export const {setKinds } = kindsSlice.actions;
export default kindsSlice.reducer;