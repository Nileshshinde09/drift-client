import { Messages } from "@/services"
import { useState, useEffect } from "react"
import { useSelector,useDispatch } from "react-redux";
import { ChatEventEnum } from "@/constants";
import { addMessages } from "@/app/slices/messangerSlice";

export const useOneOnOneChatting = () => {
    const recieverId = useSelector(state => state.messanger.currentChatInstanceId)
    const socket = useSelector(state => state.socket.socket)
    const [isSeding, setIsSeding] = useState(false)
    const [error, setError] = useState(null)
    const dispatch = useDispatch();
    const sedMessage = async (payload) => {
        if (!recieverId || !payload) return;
        try {
            setIsSeding(true)
            const response = await Messages.sendMessages(recieverId, payload)
            
        } catch (error) {
            setError(error.message)
            console.log(error.message || "Something went wrong while sending messages.");
        } finally {
            setIsSeding(false)
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
    return [sedMessage, isSeding, error]
}