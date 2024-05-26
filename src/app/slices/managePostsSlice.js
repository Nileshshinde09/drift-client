import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    status: false,
    postListData:[],
    updatePostData:null,
    deletePostData:null
}
const managePostSlice = createSlice({
    name: "managePost",
    initialState,
    reducers: {
        dashboardPost:(state,actions)=>{
            state.status=true
            state.postListData=actions.payload.postListData;
        },
        updatePost:(state,actions)=>{
            state.updatePostData=actions.payload.updatePostData
        },
        deletePost:(state,actions)=>{
            state.deletePostData=actions.payload.deletePostData
        }
    }
})

export const { dashboardPost,updatePost,deletePost } = managePostSlice.actions;

export default managePostSlice.reducer;