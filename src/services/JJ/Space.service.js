import axios from "axios";
class space {
    getAllJJChats = async () => {
        try {
            const response = await axios.get(
                "/api/v1/L/journey-journal",
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
    createJJNSpace = async ({ content, topic }) => {
        try {
            if (!content || !topic) throw new Error("fields data not available.")
            const response = await axios.post(
                "/api/v1/c/journey-journal",
                { content, topic },
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

    updateJJ= async ({ content, hide = false, postId }) => {
        try {
            if (!content || !postId) throw new Error("fields data not available.")
            const response = await axios.put(
                "/api/v1/U/journey-journal/post",
                { content, hide , postId },
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
    getPostAndSpaceDetails = async (postId) => {
        try {
            const response = await axios.get(
                `/api/v1/journey-journal/${postId}`,
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
    addNewParticipantInSpace = async (chatId,participantId) => {
        try {
            if (!chatId||!participantId) throw new Error("fields data not available.")
            const response = await axios.post(
                `/api/v1/journey-journal/${chatId}/${participantId}`,
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
    joinParticipantInSpace = async (postId,participantId) => {
        try {
            if (!postId||!participantId) throw new Error("fields data not available.")
            const response = await axios.post(
                `/api/v1/journey-journal/${postId}/${participantId}`,
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
    removeParticipantsFromSpace = async (postId,participantId) => {
        try {
            if (!postId||!participantId) throw new Error("fields data not available.")
            const response = await axios.delete(
                `/api/v1/journey-journal/${postId}/${participantId}`,
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
    leaveGroupChat = async ({chatId}) => {
        try {
            if (!chatId) throw new Error("fields data not available.")
            const response = await axios.delete(
                `/api/v1/journey-journal/leave/group/${chatId}`,
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
    deletePostAndSpace = async (postId) => {
        try {
            const response = await axios.delete(
                `/api/v1/journey-journal/${postId}`,
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
    getJJUserFeed= async () => {
        try {
            const response = await axios.get(
                `/api/v1/L/journey-journal/feed`,
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
    getJJUserPost= async (username) => {
        try {
            const response = await axios.get(
                `/api/v1/L/journey-journal/post/${username}`,
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
export const Space = new space();
