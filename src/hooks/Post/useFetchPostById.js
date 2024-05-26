import { useEffect, useState } from "react";
import { Post } from "@/services";
const useFetchPostById = (refresh=false) => {
    const [isFetching, setIsFetching] = useState(false)
    const [id, setId] = useState(null)
    const [fetchingError, setFetchingError] = useState(false)
    const [data, setData] = useState(null)
    useEffect(() => {
        ; (async () => {
            if(id){
                try {
                    setIsFetching(true)
                    const response = await Post.getPostById(id)
                    if (response?.data){
                        setData(response.data.data.fetchedPost[0])
                    }
                    setIsFetching(false)
                } catch (error) {
                    console.log(error.message)
                    setFetchingError(error.message)
                    setIsFetching(false)
                }
            }

        })()
    }, [refresh,id])
    return [data,fetchingError,isFetching,setId]
}

export {
    useFetchPostById
}