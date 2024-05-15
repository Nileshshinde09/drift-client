import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    toggleComment: false,
    postIdForComments: "",
    commentsList: [],   //initial state is empty list 🤔🤔, to increase code redunduncy 😎😎 
}
const commentSlice = createSlice({
    name: "comments",
    initialState,
    reducers: {
        OpenPostComments: (state, actions) => {   
            state.toggleComment = true;
            state.postIdForComments = actions.payload.postId;
            state.commentsList = actions.payload.commentsList;
        },
        ClosePostComments: (state) => {
            state.toggleComment = false;
            state.postIdForComments = "";
            state.commentsList = [];
        }
    }
})

export const { ClosePostComments, OpenPostComments } = commentSlice.actions;

export default commentSlice.reducer;