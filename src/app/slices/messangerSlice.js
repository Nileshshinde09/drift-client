import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    chatMessage: null,
    messageList: [],
    type: null,
    currentChatInstanceId: null,
    currentChatRoomData: null,
    isTyping: false,
    TypingEntityName:null,
    participantsList:[]
}
const messangerSlice = createSlice({
    name: "messanger",
    initialState,
    reducers: {
        setChatId: (state, actions) => {
            state.currentChatInstanceId = actions.payload;
        },
        setChatType: (state, actions) => {
            state.type = actions.payload;
        },
        setMessage: (state, actions) => {
            state.chatMessage = actions.payload;
        },
        setMessageList: (state, actions) => {
            state.messageList = actions.payload;
        },
        addMessages: (state, actions) => {
            state.messageList.unshift(actions.payload)
        },
        deleteMessage: (state, actions) => {
            state.messageList=state.messageList.filter((element)=>{
                return element._id!==actions.payload._id   
               })
        },
        setChatRoomData: (state, actions) => {
            state.currentChatRoomData = actions.payload;
        },
        startTyping: (state, actions) => {
            state.isTyping = true;
            state.TypingEntityName=actions.payload;
        },
        stopTyping: (state, actions) => {
            state.isTyping = false;
        },
        addGroupParticipants:(state,actions)=>{
            state.participantsList.push(actions.payload)
        },
        removeGroupParticipant:(state,actions)=>{
            state.participantsList = state.participantsList.filter((element)=>{
             return element===actions.payload   
            })
        }
    }
})

export const {
    addGroupParticipants,
    removeGroupParticipant,
    setMessage,
    setMessageList,
    setChatType,
    setChatId,
    addMessages,
    setChatRoomData,
    startTyping,
    stopTyping,
    deleteMessage
} = messangerSlice.actions;

export default messangerSlice.reducer;