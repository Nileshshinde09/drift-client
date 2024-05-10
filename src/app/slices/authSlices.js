import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status : false,
    userData: null,
    isEmailAuthenticated:false
}
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload;
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
        },
        emailAuthicated:(state,action)=>{
            state.isEmailAuthenticated=action.payload
        }
     }
})

export const {login, logout , emailAuthicated} = authSlice.actions;

export default authSlice.reducer;