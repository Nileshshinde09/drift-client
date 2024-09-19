import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { dashboardPost } from "@/app/slices/managePostsSlice";
import { Post } from "@/services";
const useDashboardPosts = (refresh) => {
    const [isFetching, setIsFetching] = useState(false)
    const [fetchingError, setFetchingError] = useState(false)
    const [data, setData] = useState(null)
    const dispatch = useDispatch()
    useEffect(() => {
        ; (async () => {
            try {
                setIsFetching(true)
                const response = await Post.getAllUserOwnedPosts()
                if (response.data.data.fetchedPost){
                    setData(response.data.data.fetchedPost)
                    dispatch(dashboardPost({postListData:response.data.data.fetchedPost}))
                }
                setIsFetching(false)
            } catch (error) {
                console.log(error.message)
                setFetchingError(error.message)
                setIsFetching(false)
            }

        })()
    }, [refresh])
    return [data,fetchingError,isFetching]
}

export {
    useDashboardPosts
}