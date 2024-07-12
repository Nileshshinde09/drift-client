import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    chatMessage: null,
    messageList: [],
    type: null,
    currentChatInstanceId: null,
    currentChatRoomData: null,
    isTyping: false,
    TypingEntityName:null
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
        setChatRoomData: (state, actions) => {
            state.currentChatRoomData = actions.payload;
        },
        startTyping: (state, actions) => {
            state.isTyping = true;
            state.TypingEntityName=actions.payload;
        },
        stopTyping: (state, actions) => {
            state.isTyping = false;
        }
    }
})

export const {
    setMessage,
    setMessageList,
    setChatType,
    setChatId,
    addMessages,
    setChatRoomData,
    startTyping,
    stopTyping
} = messangerSlice.actions;

export default messangerSlice.reducer;