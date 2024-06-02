import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    bookmarkData:null,
    status:false
}
const bookmarkSlice = createSlice({
    name: "bookmark",
    initialState,
    reducers: {
        setBookMark:(state,payload)=>{
            state.bookmarkData = payload.payload.bookmarkData;
            state.status=true;
        },
        removeBookMark:(state,payload)=>{
            state.bookmarkData = null;
            state.status=false;
        }
     }
})

export const {setBookMark,removeBookMark} = bookmarkSlice.actions;

export default bookmarkSlice.reducer;