import { useState, useEffect } from "react"
import { Profile } from "@/services";
const useProfile = () => {
    const [username, setUsername] = useState(null);
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [data, setData] = useState(null);
    useEffect(() => {
        (async () => {
            if (username) {
                try {
                    setIsLoading(true)
                    const respose = await Profile.getProfileByUsername({ username })
                    if (respose.data.success) {
                        setData(respose.data.data.userProfile)
                    }
                } catch (error) {
                    console.log(error.message || "Somthing went wrong while fetching user profile.");
                    setError(error)
                } finally {
                    setIsLoading(false)
                }
            }
        })()
    }, [username])


    return [data, error, isLoading, setUsername]
}
export default useProfile