import { createSlice } from "@reduxjs/toolkit";
import { PROFILE_DUMMY_IMAGE_URL } from "@/constants";
const initialState = {
    status: false,
    userData: null,
    isEmailAuthenticated: false,
    profileImageUrl: PROFILE_DUMMY_IMAGE_URL
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
        emailAuthenticated: (state, action) => {
            state.isEmailAuthenticated = action.payload
        },
        setProfileData: (state, action) => {
            state.userData = action.payload;        
        },
        setProfileImage: (state, action) => {
            state.profileImageUrl = action.payload.profileImageUrl;
        },
    }
})

export const { login, logout, emailAuthenticated, setProfileData, setProfileImage } = authSlice.actions;

export default authSlice.reducer;