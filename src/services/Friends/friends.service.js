import axios from "axios";
class friends {
    makeOrRetrieveRequest = async (userId) => {
        try {
            if(!userId) throw new Error("User id not provided.")
            const response = await axios.post(
                `/api/v1/friends/make-or-retrieve-request`,
                {
                    userId
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
            console.log(error.message || "Something went wrong while makeing or retrieving friend request.");
            return null;
        }
    }
    getRequestsAndInvitations = async () => {
        try {
            const response = await axios.get(
                `/api/v1/friends/L/get-all-requests-invitations`,
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
    respondToInvitations = async ({isAccepted,invitationId}) => {
        try {
            if (!invitationId) throw new Error("fields data not available.")
            const response = await axios.post(
                `/api/v1/friends/respond-to-invitation`,
                {
                    isAccepted, invitationId
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
            console.log(error.message || "Something went wrong while getting group chat details");
            return null;
        }
    }
    getAllFriends = async () => {
        try {
            const response = await axios.get(
                `/api/v1/friends/L/get-all-friends`,
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
                    }
                }
            )
            return response;
        } catch (error) {
            console.log(error.message || "Something went wrong fetching all friends list");
            return null;
        }
    }
    checkIsFriends = async (remote_id) => {
        try {
            if (!remote_id) throw new Error("fields data not available.")
            const response = await axios.get(
                `/api/v1/friends/check-is-friends/${remote_id}`,
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
                    }
                }
            )
            return response;
        } catch (error) {
            console.log(error.message || "Something went wrong fetching all friends list");
            return null;
        }
    }
    removeFriend = async (requestId) => {
        try {
            if (!requestId) throw new Error("fields data not available.")
            const response = await axios.delete(
                `/api/v1/friends/remove-from-friend-list/${requestId}`,
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
                    }
                }
            )
            return response;
        } catch (error) {
            console.log(error.message || "Something went wrong fetching all friends list");
            return null;
        }
    }
}
export const Friends = new friends();
