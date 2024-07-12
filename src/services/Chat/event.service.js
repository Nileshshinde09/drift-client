import axios from "axios";

class chatEvent{
    TypingStartEvent=async(chatId)=>{
        if(!chatId) return;
        try {
            
            const response = await axios.post(
                `/api/v1/chat/typing-event/${chatId}`,
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
                    }
                }
            )
            return response;
        } catch (error) {
            console.log(error.message || "Something went wrong while fetching user chat's");
        }
    };
    TypingStopEvent=async(chatId)=>{
        if(!chatId) return;
        try {
            const response = await axios.delete(
                `/api/v1/chat/typing-event/${chatId}`,
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
                    }
                }
            )
            return response;
        } catch (error) {
            console.log(error.message || "Something went wrong while fetching user chat's");
        }
    }
}
export const ChatEvent = new chatEvent();