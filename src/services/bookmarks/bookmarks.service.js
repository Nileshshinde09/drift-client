import axios from "axios";
class bookmarks {
    getFeedPost = async () => {
        //TODO: need to be change
        // return await axios.get("/api/v1/post/get-feed-posts",
        //     {
        //         headers: {
        //             'Access-Control-Allow-Origin': '*',
        //             'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
        //         }
        //     }
        // )
        // .then(response => (response))
        // .catch(error => (error));
    }

}

export const Bookmarks = new bookmarks();