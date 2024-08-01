import { Messages } from "@/services"
import { useState, useEffect } from "react"
import { useSelector,useDispatch } from "react-redux";
import { ChatEventEnum } from "@/constants";
import { addMessages } from "@/app/slices/messangerSlice";

export const useLoadGroupChat = () => {
    const recieverChatId = useSelector(state => state.messanger.currentChatInstanceId)
    const socket = useSelector(state => state.socket.socket)
    const [isSending, setIsSending] = useState(false)
    const [error, setError] = useState(null)
    const dispatch = useDispatch();
    
    const sendMessages = async (payload) => {
        if (!recieverChatId || !payload) return;
        try {
            setIsSending(true)
            const response = await Messages.sendMessages(recieverChatId, payload)
        } catch (error){
            setError(error.message)
            console.log(error.message || "Something went wrong while sending messages.");
        } finally {
            setIsSending(false)
        }
    }
    useEffect(() => {
        if (!socket) return;
          socket.on(ChatEventEnum.MESSAGE_RECEIVED_EVENT, (data) => {
            dispatch(addMessages(data));
          });
          return () => {
            socket.off(ChatEventEnum.MESSAGE_RECEIVED_EVENT);
          };
      }, [socket]);
    return [sendMessages, isSending, error]
}