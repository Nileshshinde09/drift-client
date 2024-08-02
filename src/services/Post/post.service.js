import axios from "axios";
class post {
    getFeedPost = async () => {
        try {
            return await axios.get("/api/v1/post/get-feed-posts",
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
                    }
                }
            )
        } catch (error) {
            console.log(error.message || "Something went wrong while getting feed post.");
            return null
        }
    }

    createImagePost = async ({ caption, tag, files }) => {
        try {
            const formdata = new FormData();
            const filesArray = Array.isArray(files) ? files : Array.from(files);

            filesArray.forEach(file => {
                formdata.append("uploadedImages", file);
            });

            formdata.append("caption", caption)
            formdata.append("tags", tag)
            return await axios.post("/api/v1/post/create-post-with-images", formdata,
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
                    }
                }
            )
        } catch (error) {
            console.log(error.message || "Something went wrong while creating image post.");
            return null
        }
    }

    createVideoPost = async ({ caption, tag, files }) => {
        try {
            console.log(caption,tag,files);
            const formdata = new FormData();
            const filesArray = Array.isArray(files) ? files : Array.from(files);

            filesArray.forEach(file => {
                formdata.append("files", file);
            });

            formdata.append("caption", caption)
            formdata.append("tags", tag)

            const response =  await axios.post("/api/v1/post/create-post-with-video", formdata,
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
                    }
                }
            )
            return response
        } catch (error) {
            console.log(error.message || "Something went wrong while creating image post.");
            return null
        }
    }

    getAllPosts = async () => {
        try {
            return await axios.get("/api/v1/post/get-all-posts",
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
                    }
                }
            )
        } catch (error) {
            console.log(error.message || "Something went wrong while fetching all post.");
            return null
        }
    }
    getAllUserOwnedPosts = async () => {
        try {
            return await axios.get("/api/v1/post/get-all-user-owned-posts",
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
                    }
                }
            )
        } catch (error) {
            console.log(error.message || "Something went wrong while fetching user owned post.");
            return null
        }
    }
    deletePost = async (postId) => {
        try {
            if (!postId) throw error

            return await axios.delete("/api/v1/post/delete-post",
                {
                    data: { postId },
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
                    }
                }
            )
        } catch (error) {
            console.log(error.message || "Something went wrong while deleting post.");
            return null
        }
    }
    editPostContent = async (postId) => {
        try {
            if (!postId) throw error

            return await axios.put("/api/v1/post/update-post-content",{ postId },
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
                    }
                }
            )
        } catch (error) {
            console.log(error.message || "Something went wrong while deleting post.");
            return null
        }
    }
    editPostImage = async (postId) => {
        try {
            if (!postId) throw error

            return await axios.put("/api/v1/post/update-post-images", { postId },
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
                    }
                }
            )
        } catch (error) {
            console.log(error.message || "Something went wrong while updating images of Post.");
            return null
        }
    }
    getPostById = async (PostId) => {
        try {
            if (!PostId) throw error
            return await axios.get("/api/v1/post/get-post-by-id",
                {
                    params: {
                        PostId
                    },
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
                    }
                }
            )
        } catch (error) {
            console.log(error.message || "Something went wrong while fetching user owned post.");
            return null
        }
    }
}

export const Post = new post();