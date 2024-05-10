import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    toggle : false
}
const settingSlice = createSlice({
    name: "settings",
    initialState,
    reducers: {
        toggleState: (state) => {
            state.toggle = !state.toggle
        },
     }
})

export const {toggleState} = settingSlice.actions;

export default settingSlice.reducer;