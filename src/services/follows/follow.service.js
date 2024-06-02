import axios from "axios"
class follows {
    getFolloweesByUsername = async ({ username }) => {
        try {
            if (!username) throw error
            return await axios.get(`/api/v1/follow/L/followees/${username}`,
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
                    }
                }
            )
        } catch (error) {
            console.log(error.message || "Something went wrong while getting followees list.");
        }
    }
    
    getFollowersByUsername = async ({ username }) => {
        try {
            if (!username) throw error
            return await axios.get(`/api/v1/follow/L/followers/${username}`,
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
                    }
                }
            )
        } catch (error) {
            console.log(error.message || "Something went wrong while getting followers list.");
        }
    }
    followUnfollowUser = async ({ username }) => {
        try {
            if (!username) throw error 
            return await axios.get(`/api/v1/follow/L/followed-unfollowed-to-be/${username}`,
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
                    }
                }
            )
        } catch (error) {
            console.log(error.message || "Something went wrong while getting followers list.");
        }
    }

    isFollwed = async ({ username }) => {
        try {
            if (!username) throw error  
            return await axios.get(`/api/v1/follow/L/is-follwed/${username}`,
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
                    }
                }
            )
        } catch (error) {
            console.log(error.message || "Something went wrong while getting followers list.");
        }
    }
}

export const Follows = new follows()