import axios from "axios";

class comments {
    
    getCommentsOnPost = async (postId) => {
        try {
            if(!postId) throw error
            return await axios.post("/api/v1/comment/C/get-comments-on-post",
                {
                    postId
                },
                {   
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
                    }
                }
            )
            .then(response => (response))
            .catch(error => (error))
        }
        catch (error) {
            console.log("Error occured while making api call to get all comments for post 😭😭😭::",error)
        }
    }

    createOrUpdateCommentOnPost = async (postId,content) => {
        try {
            if(!postId || !content) throw error
            return await axios.put("/api/v1/comment/C/create-update-comment-on-post",
                {
                    postId,
                    content
                },
                {   
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
                    }
                }
            )
            .then(response => (response))
            .catch(error => (error))
        }
        catch (error) {
            console.log("Error occured while creating comments on post 😭😭😭 ::",error)
        }
    }
}

export const Comments = new comments();