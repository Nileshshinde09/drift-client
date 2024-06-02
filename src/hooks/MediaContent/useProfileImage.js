import { useEffect, useState } from "react"
import { Profile } from "@/services"
const useProfileImage = () => {
    const [id, setId] = useState(null)
    const [url, setUrl] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [profileError, setProfileError] = useState(null)
    useEffect(() => {
        const fetchProfileImage = async () => {
            try {
                if (!id) {
                    setUrl(null)
                    return;
                }
                    setIsLoading(true)
                    const response = await Profile.getProfileImageById(id);
                    if (!response) throw new Error("No response from server");
                    const profileImageUrl = response?.data?.data?.response?.URL
                    if (profileImageUrl)
                        setUrl(profileImageUrl)
                    setIsLoading(false)   
            } catch (error) {
                setIsLoading(false)
                setProfileError(error.message)   
                console.error(error.message);
            }
        };
        fetchProfileImage();

    }, [id]);
    return [url, setId,isLoading,profileError]
}

export { useProfileImage }