import axios from "axios";
class oneOnonChat{
    getAllChat=async()=>{
        try {
            const response = await axios.get(
                "/api/v1/chat",
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
    getAvailableFriends=async()=>{
        try {
            const response = await axios.get(
                "/api/v1/chat/friends",
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
                    }
                }
            )
            return response;
        } catch (error) {
            console.log(error.message || "Something went wrong while fetching available friends list.");
        }
    }  
    createChat=async(receiverId)=>{
        try {
            if(!receiverId) throw error;
            const response = await axios.post(
                `/api/v1/chat/c/${receiverId}`,
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
                    }
                }
            )
            return response;
        } catch (error) {
            console.log(error.message || "Something went wrong while sending chat");
        }
    }  
    deleteChat=async(chatId)=>{
        try {
            if(!chatId) throw error;
            const response = await axios.delete(
                `/api/v1/remove/${chatId}`,
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
                    }
                }
            )
            return response;
        } catch (error) {
            console.log(error.message || "Something went wrong while deleting oneonone chat.");
        }
    } 
}
export const OneOnonChat = new oneOnonChat();