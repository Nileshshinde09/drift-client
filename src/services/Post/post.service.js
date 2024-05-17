import axios from "axios";
class post {
    getFeedPost = async () => {
        return await axios.get("/api/v1/post/get-feed-posts",
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
    createImagePost = async ({ caption, tag, files }) => {
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
            .then(response => (response))
            .catch(error => (error));
    }
}

export const Post = new post();