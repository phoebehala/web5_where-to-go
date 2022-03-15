import {createSlice} from "@reduxjs/toolkit"

const kindsSlice = createSlice({
    name:"kinds",
    initialState:{
        kinds: [],
    },
    reducers:{
        fetchDataByKinds: (state, action)=>{
            state.kinds.push(action.payload)
        }

    }
})

export const {fetchDataByKinds } = kindsSlice.actions;
export default kindsSlice.reducer;