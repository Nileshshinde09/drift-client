import { useEffect,useState } from "react";
import { Follows } from "@/services";
const useFollowers=()=>{
    const [username, setUsername] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(null)
    const [data, setData] = useState([])
    useEffect(()=>{
        ;(async () =>{
            try {
                if(username){
                    setLoading(true)
                    const response  = await Follows.getFollowersByUsername({username})
                    if(response.data){
                        setData(response.data.data.followers);
                    }
                }
                setLoading(false)
            } catch (error) {
                setLoading(false)
                setError(error.message)
                console.log(error.message || "Somthing went wrong while loading followers list");
                return null
            }
        })();
    },[username])
    return [data,loading,error,setUsername]
}

export {
    useFollowers
}