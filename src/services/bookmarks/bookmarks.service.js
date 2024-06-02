import axios from "axios";
class bookmarks {
    bookmarkUnbookmark = async (postId) => {
        try {
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
        } catch (error) {
            console.log(error.message || "Something went wrong while bookmarking or unbookmarking post");
            return null
        }
    }
    isBookmarked = async (postId) => {
        try {
            if(!postId) throw error
            return await axios.get(`/api/v1/bookmark/B/is-bookmarked?postId=${postId}`,
                {
                    headers: {
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept'
                    }
                }
            )
        } catch (error) {
            console.log(error.message || "Something went wrong while checking is bookmarked post");
            return null
        }
    }

}

export const Bookmarks = new bookmarks();