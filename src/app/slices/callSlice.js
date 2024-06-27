import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    initializedStatus: false,
    callStatus: false,
    type: null,  //'voice' or 'video'
    ice_Candidate: null,
    callerId: null,
    receiverId: null,
    ans: null,
    offer: null
}
const callSlice = createSlice({
    name: "call",
    initialState,
    reducers: {
        setIds:(state,actions)=>{
            state.callerId = actions.payload.callerId;
            state.receiverId = actions.payload.receiverId;
        },
        setInitializeCall: (state, actions) => {
            
            state.ice_Candidate = actions.payload.ice_Candidate;
            state.initializedStatus = true;
        },
        setMakeVoiceCall: (state, actions) => {
            state.callStatus = true;
            state.offer = actions.payload.offer;
            state.type = 'voice';
        },
        setMakeVideoCall: (state, actions) => {
            state.callStatus = true;
            state.offer = actions.payload.offer;
            state.type = 'video';
        },
        setAns: (state, actions) => {
            state.ans = actions.ans;
        },
        endCall: (state, actions) => {
            state.callStatus = false;
            state.initializedStatus = false;
        },


    }
})

export const {
    setIds,
    setInitializeCall,
    setMakeVoiceCall,
    setMakeVideoCall,
    setAns,
    endCall
} = callSlice.actions;

export default callSlice.reducer;