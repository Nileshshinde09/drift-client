import { useEffect, useState } from "react"
import { OneOnonChat,Messages } from "@/services"
import { useDispatch } from "react-redux"
import { setChatType, setChatId,setMessageList,setChatRoomData } from "@/app/slices/messangerSlice"
export const useCreateChat = () => {
    const dispatch = useDispatch();
    const [recieverId, setRecieverId] = useState(null)
    const [error, setError] = useState(null)
    useEffect(() => {
        if (!recieverId) return;
        ; (async () => {
            try {
                const response = await OneOnonChat.createChat(recieverId)
                if (response.data) {
                    dispatch(setChatRoomData(response.data))
                    dispatch(setChatId(response?.data?.data?._id))
                    const ChatData = await Messages.getMessages(response?.data?.data?._id)
                    dispatch(setMessageList(ChatData?.data?.data));
                    dispatch(setChatType('OneOnOne'))
                    return response
                }
            } catch (error) {
                setError(error.message)
                console.log(error.message || "Something went wrong while making chat.");
            }
        })();
    }, [recieverId, error])
    return [setRecieverId]
}

