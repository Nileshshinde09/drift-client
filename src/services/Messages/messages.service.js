import axios from "axios";
class messages {
    sendMessages = async (chatId, content = null) => {
        try {
            if (!chatId) throw error
            const response = await axios.post(
                `/api/v1/messages/${chatId}`,
                {
                    content
                },
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
                    }
                }
            )
            return response;
        } catch (error) {
            console.log(error.message || "Something went wrong while sending message.");
            return null;
        }
    }

    getMessages = async (chatId) => {
        try {
            if (!chatId) throw error
            const response = await axios.get(
                `/api/v1/messages/${chatId}`,
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
                    }
                }
            )
            return response;
        } catch (error) {
            console.log(error.message || "Something went wrong while fetching messages.");
            return null;
        }
    }
    deleteMessage = async (chatId, messageId) => {
        try {
            if (!chatId || !messageId) throw error
            const response = await axios.delete(
                `/api/v1/messages/${chatId}/${messageId}`,
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
                    }
                }
            )
            return response;
        } catch (error) {
            console.log(error.message || "Something went wrong while deleting message.");
            return null;
        }
    }
}
export const Messages = new messages();