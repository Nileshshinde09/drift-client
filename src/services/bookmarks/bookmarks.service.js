import axios from "axios";
class bookmarks {
    bookmarkUnbookmark = async (postId) => {
        if(!postId) throw error
        return await axios.post("/api/v1/bookmark/B/bookmark-unbookmark",
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

}

export const Bookmarks = new bookmarks();