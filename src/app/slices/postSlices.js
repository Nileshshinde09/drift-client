import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    postData:null,
    status:false
}
const postSlice = createSlice({
    name: "post",
    initialState,
    reducers: {
        setPost:(state,payload)=>{
            state.postData = payload.payload.postData;
            state.status=true;
        },
        removePost:(state,payload)=>{
            state.postData = null;
            state.status=false;
        }
     }
})

export const {setPost,removePost} = postSlice.actions;

export default postSlice.reducer;