import axios from "axios";
class groupChat {
    getAllChat = async () => {
        try {
            const response = await axios.get(
                "/api/v1/chat/",
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
            return null;
        }
    }
    searchAvailableFriends = async () => {
        try {
            const response = await axios.get(
                "/api/v1/chat/users",
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
                    }
                }
            )
            return response;
        } catch (error) {
            console.log(error.message || "Something went wrong while searching available freinds.");
            return null;
        }
    }
    createAGroupChat = async ({ name, participants,isAnoGroupChat,topic }) => {
        try {
            if (!name || !participants || !topic) throw new Error("fields data not available.")
            const response = await axios.post(
                "/api/v1/chat/group",
                { name, participants,isAnoGroupChat,topic },
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
                    }
                }
            )
            return response;
        } catch (error) {
            console.log(error.message || "Something went wrong while creating new group chat ");
            return null;
        }
    }
    getGroupChatDetails = async (chatId) => {
        try {
            const response = await axios.get(
                `/api/v1/chat/group/${chatId}`,
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
                    }
                }
            )
            return response;
        } catch (error) {
            console.log(error.message || "Something went wrong while getting group chat details");
            return null;
        }
    }
    renameGroupChat = async ({ name,chatId }) => {
        try {
            if (!name||!chatId) throw new Error("fields data not available.")
            const response = await axios.patch(
                `/api/v1/chat/group/${chatId}`,
                {
                    name
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
            console.log(error.message || "Something went wrong rename group chat.");
            return null;
        }
    }
    addNewParticipantInGroupChat = async (chatId,participantId) => {
        try {
            if (!chatId||!participantId) throw new Error("fields data not available.")
            const response = await axios.post(
                `/api/v1/chat/group/${chatId}/${participantId}`,
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
                    }
                }
            )
            return response;
        } catch (error) {
            console.log(error.message || "Something went wrong while adding new participants");
            return null;
        }
    }
    removeParticipantsFromGroupChat = async (chatId,participantId) => {
        try {
            if (!chatId||!participantId) throw new Error("fields data not available.")
            const response = await axios.delete(
                `/api/v1/chat/group/${chatId}/${participantId}`,
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
                    }
                }
            )
            return response;
        } catch (error) {
            console.log(error.message || "Something went wrong removing participants from group chat");
            return null;
        }
    }
    leaveGroupChat = async ({chatId}) => {
        try {
            if (!chatId) throw new Error("fields data not available.")
            const response = await axios.delete(
                `/api/v1/chat/leave/group/${chatId}`,
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
                    }
                }
            )
            return response;
        } catch (error) {
            console.log(error.message || "Something went wrong while leaving group chat");
            return null;
        }
    }
    deleteAGroupChat = async () => {
        try {
            const response = await axios.delete(
                `/api/v1/chat/group/${chatId}`,
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
                    }
                }
            )
            return response;
        } catch (error) {
            console.log(error.message || "Something went wrong while getting group chat details");
            return null;
        }
    }

}
export const GroupChat = new groupChat();