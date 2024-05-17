import axios from "axios";
class likes {
    likeUnlikePost = async (postId) => {
        if (!postId) throw error
        return await axios.post("/api/v1/likes/L/like-unlike-post",
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
            .catch(error => (error));
    }
    likeUnlikeComment = async (commentId) => {
        if (!commentId) throw error
        return await axios.post("/api/v1/likes/L/like-unlike-comment",
            {
                commentId
            },
            {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
                }
            }
        )
            .then(response => (response))
            .catch(error => (error));
    }

}

export const Likes = new likes();