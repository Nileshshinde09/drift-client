import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isImageUploaded: false,
    imageId: null,
    anoImageUrl:null,
    fileData: null,
    status: false
}
const updateProfileSlice = createSlice({
    name: "updateProfile",
    initialState,
    reducers: {
        setAvatar: (state, action) => {
            state.status = true;
            state.isImageUploaded = action.payload.isImageUploaded;
            state.imageId = action.payload.imageId;
            state.fileData = action.payload.fileData;
            state.anoImageUrl = action.payload.anoImageUrl;
        }
     }
})

export const {setAvatar} = updateProfileSlice.actions;

export default updateProfileSlice.reducer;